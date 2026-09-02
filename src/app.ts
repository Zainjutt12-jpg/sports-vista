import * as dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {useExpressServer} from "routing-controllers";
import * as path from 'path';
import { initializeSwagger } from '../src/config/swaggerConfig' ;
import {loggerMiddleware} from '../src/common/middleware/loggerMiddleware';
import AppDataSource from '../src/config/dataSourceConfig';
import config from '../src/config/config';
import * as cors from 'cors';
import * as socketIo from 'socket.io';
import * as http from 'http';
import NotificationService from '../src/service/notificationService';
import { CreateNotificationDto } from '../src/dto/request/notificationRequest';

export default class App {
    
    public app: express.Application;


    constructor(){
        console.clear();
        this.app = express();
        this.initializeDataSource();
        this.initializeMiddleware();
        this.initializeController();
        this.makeImagesPublic();
        initializeSwagger(this.app);
    }

    private initializeWebSockets(io: socketIo.Server) {
        const connectedUsers = new Map<string, string>();
    
        io.on('connection', (socket) => {
            console.log("New Connection", socket.id);
    
            socket.on("join", (data) => {
                const { userId, vendorId } = data;
                const uniqueKey = vendorId ? `${vendorId}-Vendor` : `${userId}-User`;
    
                connectedUsers.set(uniqueKey, socket.id);
                console.log(`User ${uniqueKey} connected with socket ID: ${socket.id}`);
            });
    
            socket.on("sendNotification", async (data: CreateNotificationDto) => {
                const { userId, vendorId } = data;
                const uniqueKey = vendorId ? `${vendorId}-Vendor` : `${userId}-User`;
                const notificationService = new NotificationService();
    
                const notification = await notificationService.createNotification(data);
                const userSocketId = connectedUsers.get(uniqueKey);
    
                if (userSocketId) {
                    io.to(userSocketId).emit("receiveNotification", notification);
                }
            });
    
            socket.on("disconnect", () => {
                connectedUsers.forEach((socketId, uniqueKey) => {
                    if (socketId === socket.id) {
                        connectedUsers.delete(uniqueKey);
                        console.log(`User ${uniqueKey} disconnected`);
                    }
                });
            });
        });
    }
    

    private initializeDataSource(){
        AppDataSource.initialize().then(()=>{
            console.log("Connection Successfull With Database");
        }).catch((error)=>{
            console.log("error Occurs While Connecting with DB. Error: " , error);
        })
    }

    private initializeMiddleware() {
        console.log("Initializing Node Middlware");
        const corsOptions = {
            origin: '*', // Allow all origins (you can restrict this to specific origins if needed)
            methods: 'GET,POST,PUT,DELETE',
            allowedHeaders: 'Content-Type, Authorization',
        };
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        this.app.use(loggerMiddleware);
    }
    
    private initializeController() {
        console.log("Initializing Node Controllers");
        useExpressServer(this.app , {
            cors: true,
            routePrefix: '',
            middlewares: [path.join(__dirname + '/middleware/errorMiddleware.*')],
            controllers: [path.join(__dirname + '/controller/*.*')],
            defaultErrorHandler: false
        });
    }

    private makeImagesPublic(){
        console.log('Images are Live');
        this.app.use('/images', express.static(path.join(__dirname, 'arena_images')));
        this.app.use('/tournament_logos', express.static(path.join(__dirname, 'tournament_logos')));
        this.app.use('/team_logo', express.static(path.join(__dirname, 'team_logo')));
    }

    public listen() {
        const server = http.createServer(this.app); // Create an HTTP server
        const io = new socketIo.Server(server, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            }
        });
    
        // Move WebSocket initialization here to ensure it runs on the same server
        this.initializeWebSockets(io);
    
        server.listen(config.server.port, () => {
            console.log(`Server is running on port ${config.server.port}`);
        });
    }    


}
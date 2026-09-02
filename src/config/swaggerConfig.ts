import {getMetadataArgsStorage} from "routing-controllers";
import {routingControllersToSpec} from "routing-controllers-openapi";
import * as path from "path";
import * as swaggerUI from "swagger-ui-express";
import {Application} from "express";
import {validationMetadatasToSchemas} from 'class-validator-jsonschema'
import Config from "./config";

export function initializeSwagger(app: Application): void {

    console.log(`Initializing swagger`)
    const schemas: Record<string, any> = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    })
    const storage = getMetadataArgsStorage();
    const swaggerDoc = routingControllersToSpec(storage, {
        controllers: [path.join(__dirname + '../controller/*.ts')],
        routePrefix: Config.server.routingPrefix,
    }, {
        components: {
            schemas,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        info: {
            description: 'Athletic Konnect microservice for read and write operations',
            title: 'Athletic Konnect microservice',
            version: '1.0.0',
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    })
    console.log(`Swagger Initialized`)
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}
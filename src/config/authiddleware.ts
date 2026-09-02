import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserInfoRepository } from '../repository/userRepository';
import { VendorInfoRepository } from '../repository/vendorRepository';

// JWT authentication middleware
export function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token Not Provided' });
        }
        const secretKey = 'mySportsVista0099!';

        jwt.verify(token, secretKey , async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: '401! Token has expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(400).json({ message: ' 400! Invalid token' });
                }
                return res.status(403).json({ message: '403! Un-Authorized' });
            }

            next();
        });
    } else {
        res.status(401).json({ message: 'Authorization Key not found' });
    }
}

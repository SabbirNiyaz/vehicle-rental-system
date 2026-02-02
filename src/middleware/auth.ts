import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

//! Check roles
// Higher Order Function (return a function of a function)
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        try {
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "You are not allowed"
                })
            }
            //? Verify token
            const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role as string)) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: User can't access it."
                })
            }

            next();

        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

export default auth;
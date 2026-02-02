import { Request, Response, NextFunction } from "express";

//! Check ownership
const authorizeOwnership = (req: Request, res: Response,
    next: NextFunction) => {
    const loggedUser = req.user;
    const targetUserId = req.params.id; //* note: route uses :userId

    try {
        if (!loggedUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Admin can update anyone
        if (loggedUser.role === "admin") {
            return next();
        }

        // Customer can update only own profile
        if (loggedUser.id === targetUserId) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Forbidden: cannot update other users"
        });
        
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

};


export default authorizeOwnership;
import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'
export const tokenVerification = (token: string): Promise<{success: boolean; message: string; payload?: any}> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject({success: false, message: err.message});
            } else {
                resolve({success: true, message: 'Token verified successfully', payload: decoded});
            }
        })
    })
}

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers?.authtoken as string
        if (!token) {
            return res.status(404).send({message: 'No token'});
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const result = await tokenVerification(token as string);
        if (result.success) {
            next();
        } else {
            return res.status(404).send({ message: 'authCheck failed' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error authCheck' });
    }
}

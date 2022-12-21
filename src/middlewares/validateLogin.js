import Jwt from "jsonwebtoken"
import { SECRET } from "../db/config.js";
import sql from "../db/db.js";
import { accessDenied, serverError } from "../helpers/handleError.js";

export const validateToken = (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if (!token) return accessDenied(res)
        Jwt.verify(token, SECRET, (err, decoded) => {
            if (err) return accessDenied(res)
            req.userId = decoded.id
            next()
        })
    } catch (error) {
        serverError(res)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const { userId } = req

        const [user] = await sql.query('SELECT * FROM users WHERE id = ?', [userId])        
        if (!user[0].admin) return accessDenied(res)
        
        next()
    } catch (error) {
        serverError(res)
    }
}
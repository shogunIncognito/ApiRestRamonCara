import sql from "../db/db.js"
import { serverError, notFoundError, existError } from '../helpers/handleError.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { SECRET } from "../db/config.js";

export const register = async (req, res) => {
    try {
        const { username, password, admin } = req.body

        const [exist] = await sql.query('SELECT * FROM users WHERE username = ?', [username])

        if (exist[0]) return existError(res, 'User already exists')

        const hashedPass = await bcrypt.hash(password, 10)

        const [user] = await sql.query('INSERT INTO users (username, password, admin) VALUES (?, ?, ?)', [username, hashedPass, admin || 0])

        res.json({ code: 201, message: 'User created', id: user.insertId });
    } catch (err) {
        serverError(res)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const [user] = await sql.query('SELECT * FROM users WHERE username = ?', [username])

        if (!user[0]) return notFoundError(res, 'User not found')

        const validPass = await bcrypt.compare(password, user[0].password)

        if (!validPass) return existError(res, 'Invalid password')

        const token = Jwt.sign({ id: user[0].id }, SECRET, { expiresIn: '7d' })

        res.json({ token })
    } catch (error) {
        serverError(res)
    }
}
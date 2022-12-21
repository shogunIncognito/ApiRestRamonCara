import sql from '../db/db.js';
import { serverError, notFoundError } from '../helpers/handleError.js';

export const getUsers = async (req, res) => {
    try {
        const [data] = await sql.query('SELECT * FROM users ORDER BY id DESC');
        res.json(data)
    } catch (err) {
        serverError(res)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const [data] = await sql.query('SELECT * FROM users WHERE id = ?', [id])

        if (data.length === 0) return notFoundError(res, 'user not found')

        res.json(data[0])
    } catch (err) {
        serverError(res)
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const [data] = await sql.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password])

        res.json({ code: 201, message: 'user created', id: data.insertId })        
    } catch (err) {
        serverError(res)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { body, params: { id } } = req        
        const [data] = await sql.query('UPDATE users SET ? WHERE id = ?', [body, id])
        
        if (data.affectedRows === 0) return notFoundError(res, 'user not found')
    
        res.json({ code: 200, message: 'user updated' })
    } catch (err) {
        serverError(res)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const [data] = await sql.query('DELETE FROM users WHERE id = ?', [id])

        if (data.affectedRows === 0) return notFoundError(res, 'user not found')

        res.json({ code: 200, message: 'user deleted' })
    } catch (err) {
        serverError(res)
    }
}

// eliminar varios usuarios por id
export const deleteUsersGroup = async (req, res) => {
    try {
        const { ids } = req.body
        const [data] = await sql.query('DELETE FROM users WHERE id IN (?)', [ids])

        if (data.affectedRows === 0) return notFoundError(res, 'users not found')

        res.json({ code: 200, message: 'users deleted' })
    } catch (err) {
        serverError(res)
    }
}
import sql from '../db/db.js';
import { serverError, notFoundError } from '../helpers/handleError.js';

export const getNotes = async (req, res) => {
    try {
        const [data] = await sql.query('SELECT * FROM notes ORDER BY id DESC');
        res.json(data)
    } catch (err) {
        serverError(res)
    }
}

export const getNotesUser = async (req, res) => {
    try {
        const { userid } = req.params
        const [data] = await sql.query('SELECT * FROM notes WHERE userId = ?', [userid])
        
        res.json(data)
    } catch (error) {
        serverError(res)
    }
}

export const getNoteID = async (req, res) => {
    try {
        const { id } = req.params
        const [data] = await sql.query('SELECT * FROM notes WHERE id = ?', [id])

        if (data.length === 0) return notFoundError(res, 'Note not found')

        res.json(data[0])
    } catch (err) {
        serverError(res)
    }
}

export const postNotes = async (req, res) => {
    try {
        const { title, description, userId } = req.body
        const [data] = await sql.query('INSERT INTO notes (title, description, userId) VALUES (?, ?, ?)', [title, description, userId])

        res.json({ code: 201, message: 'Note created', id: data.insertId })
    } catch (err) {
        serverError(res)
    }
}

export const updateNote = async (req, res) => {
    try {
        const { body, params: { id } } = req
        const [data] = await sql.query('UPDATE notes SET ? WHERE id = ?', [body, id])

        if (data.affectedRows === 0) return notFoundError(res, 'Note not found')

        res.json({ code: 200, message: 'Note updated' })
    } catch (err) {
        serverError(res)
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params
        const [data] = await sql.query('DELETE FROM notes WHERE id = ?', [id])

        if (data.affectedRows === 0) return notFoundError(res, 'Note not found')

        res.json({ code: 200, message: 'Note deleted' })
    } catch (err) {
        serverError(res)
    }
}

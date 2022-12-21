import { Router } from 'express';
import { getNotes, postNotes, deleteNotes, getNoteID, updateNote, getNotesUser } from '../controllers/notes.controller.js';
import { validateToken, isAdmin } from '../middlewares/validateLogin.js';

const router = Router()

router.get('/', [validateToken, isAdmin],  getNotes)
      .get('/:id', validateToken, getNoteID)
      .get('/user/:userid', validateToken, getNotesUser)
      .post('/', validateToken, postNotes)
      .delete('/:id', validateToken, deleteNotes)
      .patch('/:id', validateToken, updateNote)

export default router
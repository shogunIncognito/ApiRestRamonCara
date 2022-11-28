import { Router } from 'express';
import { getNotes, postNotes, deleteNotes, getNoteID, updateNote } from '../controllers/notes.controller.js';

const router = Router()

router.get('/notes/', getNotes)
      .get('/notes/:id', getNoteID)
      .post('/notes/', postNotes)
      .delete('/notes/:id', deleteNotes)
      .patch('/notes/:id', updateNote)
      
export default router
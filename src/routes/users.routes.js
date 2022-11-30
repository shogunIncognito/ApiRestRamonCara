import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, deleteUsersGroup } from "../controllers/users.controller.js";

const router = Router()

router.get('/users', getUsers)
      .get('/users/:id', getUserById)
      .post('/users', createUser)
      .patch('/users/:id', updateUser)
      .delete('/users/', deleteUsersGroup)
      .delete('/users/:id', deleteUser)

export default router
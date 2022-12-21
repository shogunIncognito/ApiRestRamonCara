import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, deleteUsersGroup } from "../controllers/users.controller.js";
import { isAdmin, validateToken } from "../middlewares/validateLogin.js";

const router = Router()

router.get('/', [validateToken, isAdmin], getUsers)
      .get('/:id', [validateToken, isAdmin], getUserById)
      .post('/', [validateToken, isAdmin], createUser)
      .patch('/:id', [validateToken, isAdmin], updateUser)
      .delete('/', [validateToken, isAdmin], deleteUsersGroup)
      .delete('/:id', [validateToken, isAdmin], deleteUser)

export default router
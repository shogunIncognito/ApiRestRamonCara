import { Router } from "express";

const router = Router();

// initial route '/
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my ApiRest',
        routes: [
            '/notes',
            '/users'
        ]
    })
})

// not found route
router.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found'
    })
})

export default router
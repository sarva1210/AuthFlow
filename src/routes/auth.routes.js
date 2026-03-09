import express from 'express'
import { registerUser, loginUser, verifyEmail, getProfle } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/verify/:token", verifyEmail)

router.get("/profile", protect, getProfle)

export default router
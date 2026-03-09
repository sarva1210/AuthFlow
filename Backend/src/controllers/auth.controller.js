import User from "../models/user.model.js"
import { hashPassword, comparePassword } from "../utils/hashPassword.js"
import generateToken from "../utils/generateToken.js"
import { sendVerificationEmail } from "../services/email.service.js"
import { MESSAGES } from "../constants/messages.js"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res)=>{
    try{
        const{name, email, password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message: MESSAGES.USER_EXISTS})
        }

        const hashed = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            password: hashed
        })

        const token = generateToken(user._id)

        await sendVerificationEmail(email, token)

        res.status(201).json({
            message:MESSAGES.USER_CREATED
        })

    } catch (error){
        res.status(500).json({error:error.message})
    }
}

export const verifyEmail = async (req,res)=>{
    try{
        const {token} = req.params

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        await User.findByIdAndUpdate(decoded.id,{isVerified:true})

        res.send(MESSAGES.EMAIL_VERIFIED)
    } catch(error){
        res.status(400).send("Invalid token")
    }
}

export const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:MESSAGES.INVALID_CREDENTIALS})
        }

        const isMatch = await comparePassword(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: MESSAGES.INVALID_CREDENTIALS });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: MESSAGES.VERIFY_EMAIL_FIRST });
        }

        const token = generateToken(user._id)

        res.json({
            message: MESSAGES.LOGIN_SUCCESS,
            token
        })
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

export const getProfle = async (req,res)=>{
    try{
        const user = await User.findById(req.user).select("-password")
        res.json(user)
    } catch(error){
        res.status(500).json({error: error.message})
    }
}
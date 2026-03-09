import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (email, token)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const link =`http:localhost:3000/api/auth/verify/${token}`

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Verify your email",
        html:`<a href="${link}">Click here to verify your email</a>`
    })
}
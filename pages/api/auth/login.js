import connectDB from "@/utils/connectDB";
import Users from '../../../Models/userModel'
import { valid_acc } from '../../../utils/valid'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'


connectDB()
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body)
        //


        const email = req.body.email
        const password = req.body.password



        const errMsg = valid_acc(email, password)
        if (errMsg) return res.status(400).json({ err: errMsg })
        const passwordHash = await bcrypt.hash(password, 12)
        const user = await Users.findOne({ email })
        console.log({ find_user: user })

        const isMatch = await bcrypt.compare(password, user.password)





        if (!isMatch) return res.status(400).json({ err: 'Incorrect password.' })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })






        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })


    } catch (error) {
        return res.status(400).json({ err: error.message })
    }
}
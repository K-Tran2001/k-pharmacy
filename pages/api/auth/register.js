import connectDB from "@/utils/connectDB";
import Users from '../../../Models/userModel'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'


connectDB()
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body)
        //
        //const { name, email, password, cf_password } = req.boby
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const cf_password = req.body.cf_password


        const errMsg = valid(name, email, password, cf_password)
        if (errMsg) return res.status(400).json({ err: errMsg })
        const user = await Users.find({ email })
        console.log({ userexists: user })
        if (user.email) return res.status(400).json({ err: "email is already exists" })

        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = new Users({
            name, email, password: passwordHash, cf_password
        })

        console.log(newUser)
        const result = await newUser.save()
        console.log(result)
        res.json({ msg: "Register success!!" })


    } catch (error) {
        return res.status(400).json({ err: error.message })
    }
}
import User from "../models/User.js"
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'

export const Register = async (req,res) => {
    try {
        const {name,email,password} = req.body

        const user = await User.findOne({email})
        if(user) return res.status(400).json({msg: "this email already exists"})

        if(password.length < 6) return res.status(400).json({msg: "Password must be min 6 character"})

        const passwordhashed = await bcrypt.hash(password,12)

        const newuser = await User({
            name,
            email,
            password:passwordhashed
        }).save()


        // jsonwebtoken for auth
        const accesstoken = createAccessToken({id: newuser._id})
        const refreshtoken = createRefreshToken({id: newuser._id})

        // set cookie 
        res.cookie('refreshtoken' , refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })

        res.status(200).json({accesstoken})


    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const Login = async (req,res) => {
    try {
        const  {email,password} = req.body

        const user  = await User.findOne({email})
        if(!user) return res.status(400).json({msg: "This user does not exist"})


        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg: "Password is not valid"})

        // jsonwebtoken for auth
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        // set cookie 
        res.cookie('refreshtoken' , refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })

        res.status(200).json({accesstoken})


    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const Logout = async (req,res) => {
    try {
        res.clearCookie('refreshtoken' , {path: '/user/refresh_token'})
        return res.json({msg: "Logged out"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}




export const refreshToken = async (req,res,next) => {
    try {
        const rf_token = req.cookies.refreshtoken

        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})


        jwt.verify(process.env.REFRESH_TOKEN_SECRET, (error,user) => {
            if(error) return res.status(400).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
        })

        res.json({rf_token})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}



export const getUser = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({err: "User does not exist"})

        res.json(user)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}




const createAccessToken = (user) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
import jwt from 'jsonwebtoken'


export const Auth = async(req,res,next) => {
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(400).json({err: "Invalid Authentication"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,user) => {
            if(error) return res.status(400).json({err: "Invalid Authentication"})

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}
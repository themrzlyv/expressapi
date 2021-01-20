import express from 'express'
import cloudinary from 'cloudinary'
import {Auth} from '../middleware/auth.js'
import {authAdmin} from '../middleware/authAdmin.js'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// create router

const uploadrouter = express.Router()

uploadrouter.post("/upload", Auth , authAdmin, (req,res) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({err: "No file uploaded"})

        const file = req.files.file

        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({err: "File size can not bigger than 1mb"})
        }
            

        if(file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({err: "File format must be jpeg or png"})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "ecommerce"}, async(err,result) =>{
            if(err) throw err

            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (error) {
        return res.status(500).json({err: error.message})
    }
})


//delete request

uploadrouter.post("/destroy" , Auth, authAdmin , (req,res) => {
    try {
        const {public_id} = req.body
        if(!public_id) return res.status(400).json({msg: "No image selected"})

        cloudinary.v2.uploader.destroy(public_id,async(err,result) => {
            if(err) throw err

            res.json({msg: "Image deleted"})
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
})


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

export default uploadrouter;
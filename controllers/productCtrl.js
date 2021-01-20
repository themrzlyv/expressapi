import APIfeatures from "../helpers/Apifeatures.js"
import Product from "../models/Product.js"


// filering sorting and pagination



export const getProduct = async (req,res) => {
    try {
        
        // creating new object
        const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating()
        const products = await features.query

        res.status(200).json({
            status: "success",
            results: products.length,
            products: products
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const createProduct = async (req,res) => {
    try {
        const {
            product_id, 
            title,
            price,
            description,
            content,
            images,
            category,
        } = req.body

        if(!images) return res.status(400).json({err: "There is no images for upload"})

        const product = await Product.findOne({product_id})
        if(product) return res.status(400).json({err: "There product is already exist"})

        const newProduct = await Product({
            product_id, 
            title: title.toLowerCase(),
            price,
            description,
            content,
            images,
            category,
        }).save()

        res.status(200).json({msg: "Product Created"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const deleteProduct = async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Product Deleted"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const updateProduct = async (req,res) => {
    try {
        const {
            product_id, 
            title,
            price,
            description,
            content,
            images,
            category,
        } = req.body

        if(!images) return res.status(400).json({err: "There is no images for upload"})

        await Product.findByIdAndUpdate({_id:req.params.id} , {
            product_id, 
            title: title.toLowerCase(),
            price,
            description,
            content,
            images,
            category,
        })

        res.status(200).json({msg: "Product Updated"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}
import Category from '../models/Category.js'


export const getCategory = async (req,res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const createCategory = async (req,res) => {
    try {
        const  {name} = req.body
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({err: "This Category already exists"})

        const newCategory = await Category({name}).save()

        res.status(200).json({msg: "Category created"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}


export const deleteCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "Category deleted"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

export const updateCategory = async (req,res) => {
    try {
        const {name} = req.body
        await Category.findByIdAndUpdate({_id: req.params.id}, {name})
        res.status(200).json({msg: "Category updated"})
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}
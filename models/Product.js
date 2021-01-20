import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    product_id : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title : {
        type: String,
        required: true,
        trim: true
    },
    price : {
        type: Number,
        trim: true,
        required: true
    },
    description : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    images : {
        type: Object,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    checked : {
        type: Boolean,
        default: false
    },
    sold : {
        type: Number,
        default: 0
    },
}, {timestamps: true})

export default mongoose.models.Product || mongoose.model("Product" , ProductSchema);
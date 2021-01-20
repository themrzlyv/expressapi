import mongoose from 'mongoose'

const ConnectDb = () => {
    if(mongoose.connections[0].readyState){
        console.log(`Already connected`)
    }

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log(`MongoDb Connected`))
    .catch((err) => console.log(err))
}


export default ConnectDb;
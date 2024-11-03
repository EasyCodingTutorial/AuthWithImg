import mongoose from 'mongoose'

const ConnectToDb = async () => {

    try {

        // Checking if The Connection is Already Open
        if (mongoose.connection.readyState === 1) {
            console.log("Already Connected To DB")
            return
        }

        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Connected To Db")
            return
        } else {
            throw new Error("No MONGODB_URI Found")
        }


    } catch (error) {
        console.log(error)
    }

}

export default ConnectToDb
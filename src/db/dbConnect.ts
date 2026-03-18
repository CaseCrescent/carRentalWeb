import mongoose from "mongoose"
import dns from "dns"

// บังคับใช้ Google DNS แทน DNS ของ Windows
dns.setServers(["8.8.8.8", "8.8.4.4"])

let isConnected = false

export const dbConnect = async () => {
    mongoose.set("strictQuery", true)
    if (isConnected) return

    const MONGO_URI = process.env.MONGO_URI
    if (!MONGO_URI) throw new Error("Please define MONGO_URI")

    try {
        await mongoose.connect(MONGO_URI, { bufferCommands: false })
        isConnected = true
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
}
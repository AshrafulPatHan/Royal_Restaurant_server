const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `${process.env.MONGO_URI}`

const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db("Royal_Restaurant");
        return{
            User: db.collection('Users')
        }

    }catch (error) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }

}

module.exports = connectDB;
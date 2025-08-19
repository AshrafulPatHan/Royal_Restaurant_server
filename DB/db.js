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
        console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db("Royal_Restaurant");
        return{
            Admin: db.collection('Admin'),
            Menu: db.collection('Menu'),
            Review: db.collection('Review'),
            Order: db.collection('Order'),
            Reservation: db.collection('Reservation'),
            AllTable: db.collection('AllTable'),
            Mail: db.collection('Mail'),
            Blog: db.collection('Blog'),
        }

    }catch (error) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }

}

module.exports = connectDB;
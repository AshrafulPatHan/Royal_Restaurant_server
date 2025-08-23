require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./DB/db");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running 1.0');
});


connectDB().then((collections) => {
    const publicRoutes = require('./routes/public')(collections);
    const adminRoutes = require('./routes/admin')(collections);

    app.use(publicRoutes);
    app.use("/admin", adminRoutes);

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

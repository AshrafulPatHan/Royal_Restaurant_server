const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ObjectId } = require("mongodb");
const app = express();


app.use(cors());
app.use(express.json());


module.exports = (collections) =>{
const { Admin,Menu,Review,Order,Reservation,AllTable,Mail,Blog } = collections

// auth on admin login
routes.post('/auth', async (req, res) => {
    try{
        const { name, password } = req.body;
        console.log(name,password);
        
        
        if (typeof name !== "string" || name.length > 6) {
            return res.status(400).send({ message: "Invalid name" });
        }
        if (typeof password !== "string" || password.length > 10) {
            return res.status(400).send({ message: "Invalid Password" });
        }
        
        const AdminAuth = await Admin.findOne({name: name})
        const validPassword = await bcrypt.compare(password, AdminAuth.password);
        if (!validPassword) return res.status(401).send("❌ Invalid credentials!");

        const Token = jwt.sign({ id: AdminAuth._id }, "secret_key", { expiresIn: '3h' } );
        res.status(200).send({ Token });

    }catch(error){
        console.error("error is coming to login admin",error);
        res.status(500).send("❌ Login Error: " + error.message);
    }
})

return routes
}


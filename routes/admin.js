const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ObjectId } = require("mongodb");
const app = express();


app.use(cors());
app.use(express.json());


module.exports = (collections) => {
    const { Admin, Menu, Review, Order, Reservation, AllTable, Mail, Blog } = collections

    // auth on admin login
    routes.post('/auth', async (req, res) => {
        try {
            const { name, password } = req.body;
            console.log(name, password);


            if (typeof name !== "string" || name.length > 6) {
                return res.status(400).send({ message: "Invalid name" });
            }
            if (typeof password !== "string" || password.length > 10) {
                return res.status(400).send({ message: "Invalid Password" });
            }

            const AdminAuth = await Admin.findOne({ name: name })
            const validPassword = await bcrypt.compare(password, AdminAuth.password);
            if (!validPassword) return res.status(401).send("❌ Invalid credentials!");

            const Token = jwt.sign({ id: AdminAuth._id }, "secret_key", { expiresIn: '3h' });
            res.status(200).send({ Token });

        } catch (error) {
            console.error("error is coming to login admin", error);
            res.status(500).send("❌ Login Error: " + error.message);
        }
    });

    // add menu
    routes.post('/add-menu', async (req, res) => {
        try {
            const data = req.body;
            const result = await Menu.insertOne(data);
            res.status(200).send(result);
        } catch (error) {
            console.error("error is coming to login admin", error);
        }
    });

    // add Blog
    routes.post('/add-blog', async (req, res) => {
        try {
            const data = req.body;
            const result = await Blog.insertOne(data);
            res.status(200).send(result);
        } catch (error) {
            console.error("error is coming to login admin", error);
        }
    });

    // add Table
    routes.post('/add-table', async (req, res) => {
        try {
            const data = req.body;
            const result = await AllTable.insertOne(data);
            res.status(200).send(result);
        } catch (error) {
            console.error("error is coming to login admin", error);
        }
    });

    // ---- get request

    // all menu
    routes.get('/all-menu', async (req, res) => {
        try {
            const cursor = Menu.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // all review
    routes.get('/all-review', async (req, res) => {
        try {
            const cursor = Review.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // all order
    routes.get('/all-order', async (req, res) => {
        try {
            const cursor = Order.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // all reservation
    routes.get('/all-reservation', async (req, res) => {
        try {
            const cursor = Reservation.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // all mail
    routes.get('/all-mail', async (req, res) => {
        try {
            const cursor = Mail.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // all blog
    routes.get('/all-blog', async (req, res) => {
        try {
            const cursor = Blog.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // blog details
    routes.post('/blog-details', async (req, res) => {
        try {
            const { id } = req.body; // get blog id
            const myBlog = Blog.findOne({_id : id});
            res.status(200).send(myBlog);
        } catch (error) {
            console.error('Error retrieving data :',error);
            res.status(500).send({ message: "Internal server Error" });
        }
    })


    // ---- delete request (jwt need)

    // delete review
    routes.delete('/delete-review:id', async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ message: "❌ ID not provided" })
        }

        try {
            const result = await Review.deleteOne({ _id: new ObjectId(id) });

            if (result.deleteCount > 0) {
                res.status(200).send({ message: "✅ review deleted successfully" });
            } else {
                res.status(404).send({ message: "❌ Event not found" });
            }
        } catch (error) {
            console.error("Error is coming on delete review", error)
            res.status(500).send({ message: "❌ server error" })
        }
    })

    // delete menu
    routes.delete('/delete-menu:id', async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ message: "❌ ID not provided" })
        }

        try {
            const result = await Menu.deleteOne({ _id: new ObjectId(id) });

            if (result.deleteCount > 0) {
                res.status(200).send({ message: "✅ menu deleted successfully" });
            } else {
                res.status(404).send({ message: "❌ Event not found" });
            }
        } catch (error) {
            console.error("Error is coming on delete review", error)
            res.status(500).send({ message: "❌ server error" })
        }
    })

    // delete order

    // delete blog
    routes.delete('/delete-blog:id', async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ message: "❌ ID not provided" })
        }

        try {
            const result = await Blog.deleteOne({ _id: new ObjectId(id) });

            if (result.deleteCount > 0) {
                res.status(200).send({ message: "✅ Blog deleted successfully" });
            } else {
                res.status(404).send({ message: "❌ Event not found" });
            }
        } catch (error) {
            console.error("Error is coming on delete Blog", error)
            res.status(500).send({ message: "❌ server error" })
        }
    })


    // ---- update request (jwt need)

    // update menu
    routes.put('/update-menu', async (req, res) => {
        const { id } = req.body;
        if (!id) { return res.status(400).send("❌ Id is not coming") }

        try {
            const result = await Menu.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        FoodName,
                        price,
                        details,
                        rating,
                        type,
                    }
                }
            );

            if (result.modifiedCount > 0) {
                res.status(200).send({ message: "✅ update is successful" });
            } else {
                res.status(404).send({ message: "❌ ID is not find" });
            }
        } catch (error) {
            console.error("Update Error:", error);
            res.status(500).send({ message: "❌ server error 500 " });
        }
    })

    // update review
    routes.put('/update-review', async (req, res) => {
        const { id } = req.body;
        if (!id) { return res.status(400).send("❌ Id is not coming") }

        try {
            const result = await Review.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        Name,
                        photoUrl,
                        ReviewText,
                        Date,
                    }
                }
            );

            if (result.modifiedCount > 0) {
                res.status(200).send({ message: "✅ update is successful" });
            } else {
                res.status(404).send({ message: "❌ ID is not find" });
            }
        } catch (error) {
            console.error("Update Error:", error);
            res.status(500).send({ message: "❌ server error 500 " });
        }
    })
    // update blog
    routes.put('/update-blog', async (req, res) => {
        const { id } = req.body;
        if (!id) { return res.status(400).send("❌ Id is not coming") }

        try {
            const result = await Blog.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        Title,
                        Description,
                        photoUrl,
                        Comments,
                        View,
                        Date,
                    }
                }
            );

            if (result.modifiedCount > 0) {
                res.status(200).send({ message: "✅ update is successful" });
            } else {
                res.status(404).send({ message: "❌ ID is not find" });
            }
        } catch (error) {
            console.error("Update Error:", error);
            res.status(500).send({ message: "❌ server error 500 " });
        }
    })

    return routes
}


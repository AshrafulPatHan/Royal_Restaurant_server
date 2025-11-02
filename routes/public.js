const express = require('express');
const routes = express.Router();
const { ObjectId } = require("mongodb");

module.exports = (collections) => {
    const { Menu, Review, Order, Reservation, AllTable, Mail, Blog } = collections

    routes.get('/user', (req, res) => {
        res.send('user routes')
    })

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

    // all menu
    routes.get('/all-menu', async (req, res) => {
        try {
            const cursor = await Menu.find({}).sort({ _id: -1 }).toArray();
            res.send(cursor);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // limate menu
    routes.get('/limate-menu', async (req, res) => {
        try {
            const cursor = await Menu.find().sort({ _id: 1 }).limit(3).toArray();
            res.send(cursor);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });


    // all Blog
    routes.get('/all-blog', async (req, res) => {
        try {
            const BlogData = await Blog.find().sort({ _id: -1 }).toArray();
            res.send(BlogData);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // limat blog
    routes.get('/limat-blog', async (req, res) => {
        try {
            const BlogData = await Blog.find().sort({ _id: -1 }).limit(2).toArray();
            res.send(BlogData);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // blog details
    routes.post('/blog-details-all', async (req, res) => {
        try {
            const { id } = req.body; // get blog id
            const myBlog = await Blog.findOne(
                { _id : new ObjectId(id) }
            );

            const viewcount =  parseInt(myBlog.View || 0, 10) + 1;

            const updateView = await Blog.updateOne(
                { _id : new ObjectId(id) },
                {$set: { View: viewcount }},
            );

            if (!myBlog) {
                return res.status(404).send({ message: "Blog not found" });
            }

            res.status(200).send(myBlog);
        } catch (error) {
            console.error('Error retrieving data :',error);
            res.status(500).send({ message: "Internal server Error" });
        }
    })

    // commant blog
    routes.patch('/comment',async (req,res)=>{
        const {comment,name,email,photo,id} = req.body;

        if ( !comment || !name || !email || !photo || !id ) {
            return res.status(400).send({message : "all fild is require"})
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({message: "Invalid Id format"})
        }

        const bdTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true   // AM/PM সহ দেখাবে
        });

        try{
            const filter = {_id: new ObjectId(id)};
            const addComment = {
                $push: { comments: {comment,name,email,photo,date:bdTime} }
            }
            const result = await Blog.updateOne(filter,addComment);
            res.status(200).send(result)
        }catch(error){
            console.error("error is comming on update comment:",error)
            res.status(500).send({ message: 'Error updating comment' });
        }

    })


    //  ---- post data

    // send mail
    routes.post('/send-mail', async (req, res) => {
        try {
            const MailData = req.body;
            const result = await Mail.insertOne(MailData);
            res.status(200).send(result)
        } catch (error) {
            console.error('error is comming on posing mail', error)
            res.status(500).send({ message: "Internal server error" })
        }
    })

    // Order a tabil

    // pament with SSLCommerz Payment

    return routes;
}


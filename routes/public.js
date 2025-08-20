const express = require('express');
const routes = express.Router();

module.exports = (collections) => {
const { Menu,Review,Order,Reservation,AllTable,Mail,Blog } = collections

routes.get('/user', (req,res) =>{
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
    const cursor = await Menu.find({}).sort({_id: -1}).toArray();
    res.send(cursor);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});

// limate menu
routes.get('/limate-menu', async (req, res) => {
try {
    const cursor = Menu.find().sort({_id: -1}).limit(3).toArray();
    res.send(cursor);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});


// all Blog
routes.get('/all-blog', async (req, res) => {
try {
    const BlogData = await Blog.find().sort({_id: -1}).toArray();
    res.send(BlogData);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});

// limat blog
routes.get('/limat-blog', async (req, res) => {
try {
    const BlogData = await Blog.find().sort({_id: -1}).limit(2).toArray();
    res.send(BlogData);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});




return routes;
}


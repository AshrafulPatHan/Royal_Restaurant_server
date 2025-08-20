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
    const cursor = Menu.find();
    const result = await cursor.toArray();
    res.send(result);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});

// letest menu
routes.get('/letest-menu', async (req, res) => {
try {
    const cursor = Review.find();
    const result = await cursor.toArray();
    res.send(result);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});


// all Blog
routes.get('/all-menu', async (req, res) => {
try {
    const cursor = Review.find();
    const result = await cursor.toArray();
    res.send(result);
} catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
}
});



return routes;
}


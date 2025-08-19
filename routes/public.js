const express = require('express');
const routes = express.Router();

module.exports = (collections) => {
const { Menu,Review,Order,Reservation,AllTable,Mail,Blog } = collections

routes.get('/user', (req,res) =>{
    res.send('user routes')
})


return routes;
}


const express = require('express');
const routes = express.Router();

module.exports = (collections) => {
const { Users } = collections

routes.get('/user', (req,res) =>{
    res.send('user routes')
})




return routes;
}


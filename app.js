const express=require('express');
const bodyParser=require('body-parser');
// const mongoose = require('mongoose');
const app = express();
const PORT = 4040;
// const {mongoUrl} =require('./keys');
// require('./models/user');

const requireToken= require('./middleware/requireToken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const cors = require('cors');
app.use(cors({ origin: true }));
app.use('/public', express.static('public'));
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
app.listen(PORT,()=>{
console.log("server running"+PORT)
})
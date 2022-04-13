// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// routes
const books = require('./routes/api/books');
const users = require('./routes/api/users');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes


function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'].split(' ')[1]

    if(token){
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if(err) return res.json({
                isLoggedIn:false,
                message: "Failed To Authenticate"
            })
            req.user ={},
            req.user.id = decoded.idreq.user.usename = decoded.username
            next()
        })
    }else{
        res.json({message:"Incorrect Token", isLoggedIn:false})
    }
}

app.get('/api/isUserAuth', verifyJWT, (req, res) =>{
    res.json({isLoggedIn:true, username: req.user.username})
})

console.log('inside appJS')

app.use('/api', users);
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

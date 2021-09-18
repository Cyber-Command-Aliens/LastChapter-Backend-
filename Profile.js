'use strict';
// required 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json()); 
const { default: axios } = require('axios');
server.use(express.json());
const googleKey = process.env.Google_key
const PORT = process.env.PORT;

const object = {};

const profileData = require('./ProfileDumy.json');



 object.getProfileBooks = function (req, res) {
    console.log(profileData);
    res.send(profileData);
}

//  object.deleteBook = function(req, res) {
//     const bookId = req.params.id;
//     const email = req.query.email;
//     bookModel.deleteOne({ _id: bookId }, (err, result) => {

//         bookModel.find({ ownerEmail: email }, (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 res.send(result);
//             }
//         })

//     })


// }

module.exports = object;
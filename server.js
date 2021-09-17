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


// Mongo Config
const mongoose = require('mongoose');

main().catch(err => console.log(err));
let LastChapter
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const LastChapterSchema = new mongoose.Schema({
    title: String,
    img:String,
    description:String,
    status:String,
    email:String,
    author:String,
    pages:Number
    
  });
   LastChapter = mongoose.model('Books', LastChapterSchema);
//   saving()
}

// used to add books  
async function saving() {
    const ramiBbooks = new LastChapter({
        title: 'The Subtle Art of Not Giving a F*ck',
        img:'https://productimages.hepsiburada.net/s/27/375/10193206050866.jpg',
        description:'For decades, we’ve been told that positive thinking is the key to a happy, rich life. "F**k positivity," Mark Manson says. "Let’s be honest, shit is f**ked and we have to live with it." In his wildly popular Internet blog, Manson doesn’t sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F**k is his antidote to the coddling, let’s-all-feel-good mindset that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up.',
        status:'Avalible',
        email:'rami-zaitoun@ho22tmail.com',
        author: 'Mark Manson',
        pages: 224,
   
       });
       await ramiBbooks.save();

    }



//this function for getting the data from google API
function homeHandler(req,res) {
  res.send('hello')
    
}

//using google api 
// 





//Routes 
server.get('/',homeHandler)

server.listen(PORT, () => console.log(`listening on ${PORT}`));


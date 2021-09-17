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
  let getAdventure = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Adventure&keyes&key=${googleKey}&maxResults=10`
  let getClassics = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Classics&keyes&key=${googleKey}&maxResults=10`
  let getComics = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Comics&keyes&key=${googleKey}&maxResults=10`
  let getMystery = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Mystery&keyes&key=${googleKey}&maxResults=10`
  let getHistorical = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Historical&keyes&key=${googleKey}&maxResults=10`
  let getHorror = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Horror&keyes&key=${googleKey}&maxResults=10`
  let getLove = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Love&keyes&key=${googleKey}&maxResults=10`
 let adventure ,classics,comics,mystery,historical,horror,Love;

  axios
  .get(getAdventure)
  .then((results) => {
    const bookArray = results.data.items
    adventure = bookArray.map((book) => {
      return new GoogleBooks(book)
    })

  })
  .catch (err =>{
    console.log('error');
  })
  axios
  .get(getClassics)
  .then((results) => {
    const bookArray = results.data.items
    classics = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  })
  .catch (err =>{
    console.log('error');
  })
  axios
  .get(getComics)
  .then((results) => {
    const bookArray = results.data.items
    comics = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  })
  .catch (err =>{
    console.log('error');
  })
  axios
  .get(getMystery)
  .then((results) => {
    const bookArray = results.data.items
    mystery = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  }).catch (err =>{
    console.log('error');
  })
  axios
  .get(getHistorical)
  .then((results) => {
    const bookArray = results.data.items
    historical = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  }).catch (err =>{
    console.log('error');
  })
  axios
  .get(getHorror)
  .then((results) => {
    const bookArray = results.data.items
    horror = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  }).catch (err =>{
    console.log('error');
  })
  axios
  .get(getLove)
  .then((results) => {
    const bookArray = results.data.items
    Love = bookArray.map((book) => {
      return new GoogleBooks(book)
    })
  }).catch (err =>{
    console.log('error');
  })
  setTimeout(() => {
    let categories = {
      "Adventure": adventure,
      "Classics": classics,
      "Comics": comics,
      "Mystery":mystery,
      "Historical":historical,
      "Horror":horror,
      "love":Love,
     } 
    
    console.log(categories);
    res.send(categories)
  }, 1000);
  

}

//using google api 
function GoogleBooks(book){
  this.title = book.volumeInfo.title;
  this.image= book.volumeInfo.imageLinks.thumbnail;
  this.publishedDate= book.volumeInfo.publishedDate
  this.description= book.volumeInfo.description;
  this.auth= book.volumeInfo.authors;
  this.status= book.volumeInfo.printType;
  this.pages=book.volumeInfo.pageCount;
  this.category =book.volumeInfo.categories;
  this.infoLink= book.volumeInfo.infoLink
}





//Routes 
server.get('/',homeHandler);

server.listen(PORT, () => console.log(`listening on ${PORT}`));


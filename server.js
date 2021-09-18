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
let bookcategories
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const LastChapterSchema = new mongoose.Schema({
    title: String,
    img:String,
    description:String,
    status:String,
    email:String,
    author:String,
    pages:Number,
    catgory:String,
    infoLink:String,
  });
   LastChapter = mongoose.model('Books', LastChapterSchema);
  bookcategories = mongoose.model('bookcategories', LastChapterSchema);
   
  
  // saving()
  
  // dleteItems()
}
function dleteItems(){
  bookcategories.remove({}, function(err) {
    if (err) {
        console.log(err)
    } else {
        res.end('success');
    }
  }
  );
  
}

// used to add books  
async function saving() {
    const ramiBbooks = new LastChapter({
        title: 'test',
        img:'https://productimages.hepsiburada.net/s/27/375/10193206050866.jpg',
        description:'For decades, we’ve been told that positive thinking is the key to a happy, rich life. "F**k positivity," Mark Manson says. "Let’s be honest, shit is f**ked and we have to live with it." In his wildly popular Internet blog, Manson doesn’t sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F**k is his antidote to the coddling, let’s-all-feel-good mindset that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up.',
        status:'Avalible',
        email:'rami-zaitoun@ho22tmail.com',
        author: 'Mark Manson',
        pages: 224,
   
       });
       await ramiBbooks.save();
       const TEST2 = new bookcategories({
        title: 'test2',
        img:'https://productimages.hepsiburada.net/s/27/375/10193206050866.jpg',
        description:'For decades, we’ve been told that positive thinking is the key to a happy, rich life. "F**k positivity," Mark Manson says. "Let’s be honest, shit is f**ked and we have to live with it." In his wildly popular Internet blog, Manson doesn’t sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F**k is his antidote to the coddling, let’s-all-feel-good mindset that has infected modern society and spoiled a generation, rewarding them with gold medals just for showing up.',
        status:'Avalible',
        email:'rami-zaitoun@ho22tmail.com',
        author: 'Mark Manson',
        pages: 224,
   
       });
       await TEST2.save();
    }


 

function homeHandler(req,res) {

 
  bookcategories.find({'catgory'
    :['Adventure','Classics','Mystery','Historical','Horror','Love','Comics']},(err,result) => {
    if (err) {
        console.log(err);
    }
    else{
        
        res.send(result)
    }
  })  



//This fucntion used to get books api from the data base
// ramizaitoun
//  function getbooksApi(){
//   let getAdventure = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Adventure&keyes&key=${googleKey}&maxResults=10`
//   let getClassics = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Classics&keyes&key=${googleKey}&maxResults=10`
//   let getComics = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Comics&keyes&key=${googleKey}&maxResults=10`
//   let getMystery = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Mystery&keyes&key=${googleKey}&maxResults=10`
//   let getHistorical = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Historical&keyes&key=${googleKey}&maxResults=10`
//   let getHorror = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Horror&keyes&key=${googleKey}&maxResults=10`
//   let getLove = `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Love&keyes&key=${googleKey}&maxResults=10`

//   let googleArray
//   axios
//     .get(`https://www.googleapis.com/books/v1/volumes?q=flowers+subject:Love&keyes&key=${googleKey}&maxResults=10`)
//     .then((results) => {
//       const bookArray = results.data.items
     
//       googleArray= bookArray.map((book) => {
                
//         return new GoogleBooks(book)
  
//   })
  
//     // console.log(googleArray);
    
//     googleArray.map((item) => {
      
//       bookcategories.create({ 
//           title: item.title,
//           img: item.image,
//           description: item.description,
//           status: item.status,
//           author: item.auth[0],
//           pages: item.pages,
//           catgory: 'Love',
//           infoLink:item.infoLink
          
//       });
      
//     })
//     })
//     .catch (err =>{
//       console.log('error',err);
//     })
//  }

  

}

//using google api 
// function GoogleBooks(book){
//   this.title = book.volumeInfo.title;
//   this.image= book.volumeInfo.imageLinks.thumbnail;
//   this.publishedDate= book.volumeInfo.publishedDate
//   this.description= book.volumeInfo.description;
//   this.auth= book.volumeInfo.authors;
//   this.status= book.volumeInfo.printType;
//   this.pages=book.volumeInfo.pageCount;
//   this.infoLink= book.volumeInfo.infoLink
// }





//Routes 
server.get('/',homeHandler);

server.listen(PORT, () => console.log(`listening on ${PORT}`));


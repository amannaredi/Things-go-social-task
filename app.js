const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentDB", { useNewUrlParser: true , useUnifiedTopology: true } );

const dataSchema = {
  name : String,
  class :{
    type:Array,
    required: true
  } ,
  subjects:{
    type:Array,
    required:true
  },
  year : String,
  contact : String,
  societies : Array,

}

const Data = new mongoose.model("Data", dataSchema)

mongoose.set('useFindAndModify', false);


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",  function(req, res){

  const name = req.body.name ;
  const contact= req.body.contact;
  const year = req.body.year ;
  const class_ = req.body.class;
  const subjects = req.body.subject;
  const societies = req.body.society;

console.log(name,contact, year, class_, subjects, societies);

const data = new Data({
  name:name,
  contact:contact,
  year:year,
  class:class_,
  subjects:subjects,
  societies:societies

})

 data.save()
 res.redirect("/success")

// Query to find data for particular class and society

// Data.find({class : {$all:["Btech"]}, societies : {$all:["science"]}}, function(err, foundedData){
//   if(foundedData){
//     console.log(foundedData)
//   }
//   else{
//     console.log(err)
//   }
//
// })
})

app.get("/success", function(req,res){
  res.sendFile(__dirname + "/success.html")
})

 app.listen(3000, function(){
  console.log("Server at port 3000")
})

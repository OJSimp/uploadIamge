const express = require('express')

const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');

const multer = require("multer");
const fs = require("fs");
const path = require("path");

//models
const Image = require("./models/image")

// create servers
const app = express()

//middlewares
app.use(cors());
app.use(express.json())


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {

   cb(null, file.fieldname);
    
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5242880 },
});


//-----------Routes START-----------

// Routes for Image uplaoding with Multer
// name = image-attachment

app.post("/images", upload.single("image-attachment"), async (req, res) => {
  
 console.log(req.file, req.body)

 if (!req.file) {
   
    res.json({ message: "no image received" });
    
  } else {
    const image = new Image({
      image: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.fieldname)
        ),
        contentType: "image/png",
      },
    });
    image.save(() => {
      fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.fieldname));
      res.json({ message: "hello" });
    });
  }
});






//-----------Routes End-----------


 
//connection middlewares

mongoose.connect(process.env.KEY).catch((error) => {
console.log(error)
})

mongoose.connection.on('connected', () => {

 app.listen(process.env.PORT, () => {
 console.log("app active:", process.env.PORT)
 })
 
 console.log("connection active")})


mongoose.connection.on('error', () => {console.log("error")})

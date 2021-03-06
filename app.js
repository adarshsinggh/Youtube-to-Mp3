/// required packages

const { request, response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// creating the express Server

const app = express();

// server port number

const PORT = process.env.PORT || 3000;

// Set Template Engine

app.set("view engine","ejs");
app.use(express.static("public"));

//needed to parse html data for post request

app.use(express.urlencoded({
 extended :true

}))

app.use(express.json());

app.get("/",(req,res) => {
    res.render("index");
})

app.post("/convert-mp3", async(req,res) => {    
    const videoId = req.body.videoId;
    if(videoId === undefined||
        videoId === ""||
        videoId === null){
return res.render("index",{success:false,message:"Please Enter a Valid Video Id"});
    }else{
        const fetchAPI = await fetch('https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}',{
            "methods":"GET",
            "headers":{
                "x-rapidapi-key" : process.env.API_KEY,
                "x-rapidapi-host" : process.env.API_HOST
            }
        });

        const  fetchResponse = await fetchAPI.json();

        if(fetchResponse.status === "200"){
            return res.render("index",{success : true,song_title : fetchResponse.title,song_link : fetchResponse.link });
        }else{
            return res.render("index",{
                success:false,message:"fetchResponse.msg"
            })
        }
    }
});

// starting the server

app.listen(PORT,() => {
 console.log('Server Started on the Port'+PORT);
})
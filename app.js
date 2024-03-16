const { isUtf8 } = require("buffer");
let express = require("express");
let app = express();
let https = require("https");
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
   

})

app.post("/", function(req,res){
   let query = req.body.cityName;
   let url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid=bb3e52412a78b7315d5341d09133e1fe&units=metric";
    https.get(url, function(response){ 
        
     response.on("data", function(data){   
        
        let weatherJSON = JSON.parse(data) 
        let weatherTemp = weatherJSON.main.temp 
        let weatherState = weatherJSON.weather[0].description
        let weatherIcon = weatherJSON.weather[0].icon
        let imgUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        res.set("Content-Type", "text/html");
        res.write(`<h1>The tempature of ${query} is, ${weatherTemp}C degree today.</h1>`);
        res.write(`<h1>The sky will be ${weatherState} throughout the day</h1>.`);
        res.write(`<img src= "${imgUrl}" >`);
        res.send();
         })   
    })

})

app.listen(3000, function(){
    console.log("Server 3000 is on progress");
})


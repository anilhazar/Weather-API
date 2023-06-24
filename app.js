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
   let query = req.body.cityName; // html de forma atadığımız değere ulaşıyoruz.
   let url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid=bb3e52412a78b7315d5341d09133e1fe&units=metric";
    https.get(url, function(response){ // bir api nesnesi oluşturup, eğer bu apiye veri gelirse nesneyi veri çekmek için kullanacağız.
       // console.log(response);
        
     response.on("data", function(data){  // response nesnesine gelen datayı event listener ekleyerek function olasılığı yaratıyor. 
        
       //console.log(data); // data is JSON FILE hexadecimal 
        let weatherJSON = JSON.parse(data) // bu datayı JSON File şekline dönüştürüyoruz ve bir node objesine atıyoruz. 
        //console.log(weatherJSON);
        let weatherTemp = weatherJSON.main.temp // burada JSON ağacını kontrol ederek kendine path yapabilirsin veya keyin pathini kopyalayabilirsin. 
        //console.log(weatherTemp); // burada temp değerine ulaşıp onu bir variable atıyoruz. sonuçta weatherJSON diye bir nesneye atadık tüm datayı 
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


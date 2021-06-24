const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

      res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

  const query=req.body.cityName
  const appidKey="6576f538d91956037524f524f1a31cb8"
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appidKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData=JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const weatherIcon = weatherData.weather[0].icon
    const imageURL="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"

    res.write("<h1>The tempreture of "+query+" is "+temp+" degrees Celcius.</h1>");
    res.write("<h2>The weather is currently "+weatherDescription+"</h2>");
    res.write("<img src="+imageURL+">");
    res.send();
    })
  })
})


app.listen(3000,function(){

  console.log("Server is running on port 3000.");
})

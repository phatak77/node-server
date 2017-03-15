var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/listCars', function(req,res){
    fs.readFile("car_details.json",'utf8',function(err,data){
        //console.log(data);
        res.end(data);
    });
})

app.post('/listCars',function(req,res){
    a = JSON.parse(Object.keys(req.body)[0]);
    console.log(a);
    //update the car_details.json with the status
    fs.readFile("car_details.json",'utf-8',function(err,data){
        data = JSON.parse(data);
        for(i=0;i<data.length;i++)
        {
            if(data[i]["number"] == a["number"])
            {
                if(data[i]["status"] == "parked")
                {
                    data[i]["status"] = "not parked";
                    break;
                }
                else{
                    data[i]["status"] = "parked";
                    break;
                }
            }
        }

        //write to the readFile
        fs.writeFile("car_details.json",JSON.stringify(data));

        console.log(data);
    })
    res.writeHead(200);
    res.write('success');
    res.end('success');
})

app.post('/login',function(req,res){
    var user = JSON.parse(Object.keys(req.body)[0]);
    console.log(user);
    fs.readFile("users.json",'utf-8',function(err,data){
        data = JSON.parse(data);
        var usermatched = false;
        for(i=0;i<data.length;i++)
        {
            if(data[i]["name"] == user["name"])
            {
                if(data[i]["pwd"] == user["pwd"])
                {
                    usermatched = true;
                    break;
                }
            }
        }

        res.writeHead(200);
        res.write(usermatched);
        res.end(usermatched);
    })
})

var server = app.listen(process.env.PORT || 8888,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening");
})
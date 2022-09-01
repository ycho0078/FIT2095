//Import packages
const express = require("express");
const mongodb = require("mongoose");
const morgan = require("morgan");
const ejs = require("ejs");
const path=require('path');

//Configure Express
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use(express.static("public/images"));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use(express.static("public/css"));

app.listen(8080);

const url = 'mongodb://localhost:27017/lab6DB'
const Parcel = require('./model/parcel');
const { default: mongoose } = require("mongoose");
const { off } = require("process");
const parcel = require("./model/parcel");
mongoose.connect(url, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Successfully connected");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname +"/public/views/index.html");
  });

app.post("/addnewparcel", function(req,res){
    let parcelDetails = req.body;
    let newParcel = new Parcel({
        sender: parcelDetails.sender,
        address: parcelDetails.address,
        weight: parcelDetails.weight,
        fragile: parcelDetails.fragile
    })
    newParcel.save(function(err){
        if(err)
        console.log('Unable to save' +err);
        else console.log('Saved Successfully');
    });
    res.redirect("/getparcels");
});

app.get("/getparcels",function(req,res){
    Parcel.find({},function (err, data) {
        res.render(__dirname +"/public/views/listparcels.html", { parcelsDb: data });
      });
});

app.get("/updateparcel",function(req,res){
    res.sendFile(__dirname +"/public/views/updateparcel.html");
});

app.post("/updateparceldata",function(req,res){
    let parcelDetails = req.body;
    let filter = {_id: mongoose.Types.ObjectId(parcelDetails.id)}
    let theUpdate = {
        $set: {
          sender: parcelDetails.sender,
          address: parcelDetails.address,
          weight: parcelDetails.weight,
          fragile: parcelDetails.fragile
        }
      };
    Parcel.updateOne(filter,theUpdate).exec();
    res.redirect("/getparcels");
});

app.get("/deleteparcel",function(req,res){
    res.sendFile(__dirname +"/public/views/deleteparcel.html");
});

app.post("/deleteparceldata",function(req,res){
    let parcelID = req.body;
    let filter = {_id: mongoose.Types.ObjectId(parcelID._id)};
    Parcel.find({filter}).deleteOne().exec();
    res.redirect("/getparcels");
})

app.get("/getparcelbysender",function(req,res){
    res.sendFile(__dirname +"/public/views/listbysender.html");
});

app.post("/postparceldatabysender",function(req,res){
    let filter = {sender:req.body.sender};
    Parcel.find(filter).exec(function(err,data){
        if(err){console.log(err);}
        res.render(__dirname +"/public/views/listparcels.html", { parcelsDb: data });
      });
});

app.get("/getparcelbyweight",function(req,res){
    res.sendFile(__dirname +"/public/views/listbyweight.html");
})

app.post("/postparceldatabyweight", function(req,res){
    let max = req.body.max;
    let min = req.body.min;
    Parcel.where('weight').gte(min).lte(max).exec(function(err,data){
        console.log(min);
        console.log(max);
        if(err) throw err;
        res.render(__dirname +"/public/views/listparcels.html", { parcelsDb: data });
    })
})

app.get("/deleteall",function(req,res){
    res.sendFile(__dirname + "/public/views/deleteall.html");
})

app.get("/deleteallbyweight",function(req,res){
    res.sendFile(__dirname+"/public/views/deleteallbyweight.html")
})
app.post("/deletebyweight",function(req,res){
    let filter = {weight : req.body.weight};
    Parcel.find(filter).remove().exec();
    res.redirect("/getparcels");
})
app.get("/address",function(req,res){
    res.sendFile(__dirname+"/public/views/address.html")
})
app.post("/deletebyaddress",function(req,res){
    let filter = { address : req.body.address};
    Parcel.find(filter).remove().exec();
    res.redirect("/getparcels");
})
app.get("/deleteallbyfragile",function(req,res){
    res.sendFile(__dirname+"/public/views/deleteallbyfragile.html")
})
app.post("/deletebyfragile",function(req,res){
    let filter = {fragile : req.body.fragile};
    Parcel.find(filter).remove().exec();
    res.redirect("/getparcels");
})
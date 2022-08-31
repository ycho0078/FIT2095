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
const Parcel = require('./models/parcel');
const { default: mongoose } = require("mongoose");
//const { off } = require("process");
mongoose.connect(url, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Successfully connected");
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

app.post("/addnewparcel", function(req,res){
    let parcelDetails = req.body;
    let newParcel = new Parcel({
        sender: parcelDetails.sender,
        address: parcelDetails.address,
        weight: parcelDetails.weight,
        fragile: paracelDetails.fragile
    })
    newParcel.save(function(err){
        if(err)
        console.log('Unable to save' +err);
        else console.log('Saved Successfully');
    });
    res.redirect("/getparcels");
});

app.get("/getparcels",function(req,res){
    Parcel.find({})
    .toArray(function (err, data) {
      res.render(path.join(__dirname,"views/listparcels.html"), { parcelsDb: data });
    });
});

app.get("/updateparcel",function(req,res){
    res.sendFile(path.join(__dirname,"views/updateparcel.html"));
});

app.post("/updateparceldata",function(req,res){
    let parcelDetails = req.body;
    let filter = {_id: mongoose.Types.ObjectId(parcelDetails._id)}
    let theUpdate = {
        $set: {
          sender: parcelDetails.nsender,
          address: parcelDetails.naddress,
          weight: parcelDetails.nweight,
          fragile: parcelDetails.nfragile
        }
      };
    Parcel.updateOne(filter,theUpdate);
    res.redirect("/getparcels");
});

app.get("/deleteparcel",function(req,res){
    res.sendFile(path.join(__dirname,"views/deleteparcel.html"));
});

app.post("/deleteparceldata",function(req,res){
    let parcelDetails = req.body;
    let filter = {_id: mongoose.Types.ObjectId(parcelDetails._id)};
    Parcel.deleteOne(filter);
    res.redirect("/getparcels");
})

app.get("/getparcelbysender",function(req,res){
    res.sendFile(path.join(__dirname,"views/listbysender.html"));
});

app.post("/postparceldatabysender",function(req,res){
    let filter = req.body.sender;
    Parcel.find({filter})
    .toArray(function (err, data) {
      res.render(path.join(__dirname,"views/listparcels.html"), { parcelsDb: data });
    });
});

app.get("/getparcelbyweight",function(req,res){
    res.sendFile(path.join(__dirname,"views/listbyweight.html"));
})

app.post("/postparceldatabyweight", function(req,res){
    let max = req.body.weight-max;
    let min = req.body.weight-min;
    Parcel.where('weight').gte(min).lte(max).exec(function(err,data){
        if(err) throw err;
        res.render(path.join(__dirname,"views/listparcels.html"), { parcelsDb: data });
    })
})

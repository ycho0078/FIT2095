const express =require('express');
const app =express();

const mongoose = require('mongoose');
const Car = require('./models/car')


const url = 'mongodb://localhost:27017/week6DB'
mongoose.connect(url, function(err){
    if(err===null)
    console.log('Connected Successf  ully')
    let car = new Car({maker:'BMW', model:'X7',year:2020});
    car.save(function(err){
        if(err)
        console.log('Unable to save' +err);
        else console.log('Saved Successfully')
    })
})

Car.findByIdAndUpdate('',{maker:'VW'},function(err){
    if(err) console.log(err);
    else console.log("Updated Successfully")
})
//Car car = new Car()
const express =require('express');
const app =express();

const mongoose = require('mongoose');
const Product = require('products');


const url = 'mongodb://59.0.152.66:88566/warehouse';
mongoose.connect(url, function(err){
    if(err===null)
    console.log('Connected Successfully')
    let product = new Product({ name: 'Milk', origin: 'Australia', weight:3, cost: 12});
    product.save(function(err){
        if(err)
        console.log('Unable to save' +err);
        else console.log('Saved Successfully')
    })
});
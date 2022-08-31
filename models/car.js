const mongoose = require('mongoose');

//schema is a class
const carSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId, auto:true},
    maker: {type: String, required: true},
    model: {type: String, default: '735'},
    year: {type: Number, validate:{validator: function(aYear){
        return (aYear>=1990 && aYear<=2023)
        },
        message:'Invalid Year'}
    }
});

module. exports =mongoose.model('Car', carSchema);



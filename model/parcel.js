const mongoose = require('mongoose');

//schema is a class
const parcelSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId, auto:true},
    sender: {type: String, required: true},
    address: {type: String, required: true},
    weight: {type: Number, validate:{validator: function(pWeight){
        return (pWeight>0)
        },
        message:'Invalid Weight'}
    },
    fragile: {type: String}
});

module. exports =mongoose.model('Parcel', parcelSchema);
const mongoose = require("mongoose");
let doctorSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    firstName: {
      type: String,
      required: true,
      validate:{validator: function(fname){
        return (fname.length >= 5)},
    message: "firstName length cannot be less than 5"}
    },
    lastName: String,
  }
});

//year: {type: Number, validate:{validator: function(aYear){
 //   return (aYear>=1990 && aYear<=2023)},
//message:'Invalid Year'}
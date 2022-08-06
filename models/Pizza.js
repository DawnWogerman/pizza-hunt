const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({

    pizzaName: {
        type: String
    },
    
    createdBy: {
        type: String
    },

    createdAt: {
        type: String,
        default: Date.now
    },

    size: {
        type: String,
        default: 'Large'
    },

    toppings: []
});


//create the Pizza model using the Pizza Schema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;
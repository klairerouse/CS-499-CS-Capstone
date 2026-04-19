const mongoose = require('mongoose');

//Define animal schema
const animalSchema = new mongoose.Schema({
    age_upon_outcome: {type: String, required: true},
    animal_id: {type: String, required: true, index: true},
    animal_type: {type: String, required: true},
    breed: { type: String, required: true},
    color: {type: String, required: true},
    date_of_birth: {type: Date, required: true},
    datetime: {type: Date, required: true},
    monthyear: {type: Date, required: true},
    name: {type: String, required: true},
    outcome_subtype: {type: String, required: false},
    outcome_type: {type: String, required: false},
    sex_upon_outcome: {type: String, required: false},
    location_lat: {type: Number, required: true},
    location_long: {type: Number, required: true},
    age_upon_outcome_in_weeks: {type: Number, required: false}
});

const Animal = mongoose.model('aac_animals', animalSchema);
module.exports = Animal;
const Animal = require('../models/animal'); //register model

// GET: /api/aac_animals
const aacList = async (req, res) => {
  try {
    const animals = await Animal.find({}).exec();
    return res.status(200).json(animals);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET: /api/aac_animals/:animalCode
const animalFindByCode = async (req, res) => {
  try {
    const animal = await Animal.find({ animal_id: req.params.animalCode }).exec();
    return res.status(200).json(animal);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST: /api/aac_animals
const aac_animalsAddAnimal = async (req, res) => {
  try {
    const newAnimal = new Animal({
      animal_id: req.body.animal_id,
      age_upon_outcome: req.body.age_upon_outcome,
      animal_type: req.body.animal_type,
      breed: req.body.breed,
      color: req.body.color,
      date_of_birth: req.body.date_of_birth,
      datetime: req.body.datetime,
      monthyear: req.body.monthyear,
      name: req.body.name,
      outcome_subtype: req.body.outcome_subtype,
      outcome_type: req.body.outcome_type,
      sex_upon_outcome: req.body.sex_upon_outcome,
      location_lat: req.body.location_lat,
      location_long: req.body.location_long,
      age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
    });

    const savedAnimal = await newAnimal.save();
    return res.status(201).json(savedAnimal);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT: /api/aac_animals/:animalCode
const aac_animalsUpdateAnimal = async (req, res) => {
  try {
    const updatedAnimal = await Animal.findOneAndUpdate(
      { animal_id: req.params.animalCode },
      {
        age_upon_outcome: req.body.age_upon_outcome,
        animal_type: req.body.animal_type,
        breed: req.body.breed,
        color: req.body.color,
        date_of_birth: req.body.date_of_birth,
        datetime: req.body.datetime,
        monthyear: req.body.monthyear,
        name: req.body.name,
        outcome_subtype: req.body.outcome_subtype,
        outcome_type: req.body.outcome_type,
        sex_upon_outcome: req.body.sex_upon_outcome,
        location_lat: req.body.location_lat,
        location_long: req.body.location_long,
        age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
      },
      { new: true }
    ).exec();

    return res.status(200).json(updatedAnimal);
  } catch (err) {
    return res.status(400).json(err);
  }
  
};

// DELETE animal from aac_animals
const deleteAnimal = async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const result = await Animal.deleteOne({ animal_id: animalId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  aacList,
  animalFindByCode,
  aac_animalsAddAnimal,
  aac_animalsUpdateAnimal,
  deleteAnimal
};
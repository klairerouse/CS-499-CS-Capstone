const fs = require("fs");
const path = require("path");
//const mongoose = require("mongoose");
const Animal = require("../../app_api/models/animal");

// Load filters.json
const filtersPath = path.join(__dirname, "../../data/aac_filters.json");
const filters = JSON.parse(fs.readFileSync(filtersPath, "utf8"));

// Build query, change everything to lowercase
function buildQuery(filterType) {
    filterType = (filterType || "all").toLowerCase();

  if (filterType === "all") return {};

     const config = filters[filterType];
  if (!config) return {};
  
  const queryParts = [];
  
  //this is for the breed requirement
  if (config.breed && config.breed.length > 0) {
    queryParts.push({
      $or: config.breed.map(b => ({ breed: { $regex: b, $options: "i" } }))
    });
  }

  //this is the gender/fixed status requirement
  if (config.sex_upon_outcome) {
    queryParts.push({ sex_upon_outcome: config.sex_upon_outcome });
  }

  //this is for the age in weeks requirements from the company
  if (config.age_upon_outcome_in_weeks) {
    queryParts.push({
      age_upon_outcome_in_weeks: {
        $gte: Number(config.age_upon_outcome_in_weeks.$gte),
        $lte: Number(config.age_upon_outcome_in_weeks.$lte)
      }
    });
  }

  return queryParts.length > 0 ? { $and: queryParts } : {};
}

//querys the database per the filter requirements
module.exports.getFilteredAnimals = async function(req, res) {
  try {
    const filterType = req.query.filter || "all";
    const query = buildQuery(filterType);

    const results = await Animal.find(query).lean();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
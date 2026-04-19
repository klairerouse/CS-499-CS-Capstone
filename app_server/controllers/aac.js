//for Austin Animal Center tab (aac) view
var fs = require('fs')
var animals = JSON.parse(fs.readFileSync('./data/animals.json','utf8'));

const aac = (req, res) => {
    res.render('aac', { title: 'Austin Animal Center', animals});
};

module.exports = {
    aac
};
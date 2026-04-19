/*GET HOMEPAGE*/

const index = (req, res) => {
    res.render('index', { title: "Gravioso Salvare"});
};

module.exports = {
    index
}
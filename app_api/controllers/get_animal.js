const animalsEndpoint = 'http://localhost:3000/api/aac_animals';
const options = {
    method:'GET',
    headers: {
        'Accept': 'application/json'
    },
};

const get_animal = async function(req, res, next)    {
    await fetch(animalsEndpoint, options)
    .then((res) => res.json())
    .then((json) => {
        let message = null;
        if (!(json instanceof Array))  {
            message = "API lookup error";
            json = [];
        } else {
            if(!json.length)    {
                message = "No animals exist in our database!";
            }
        }
        res.render("get_animals", {title: "Grazioso Salvare", aac_animals: json, message});
        })
        .catch((err) => res.status(500).send(err.message));
        };

module.exports = {
    get_animal,
};
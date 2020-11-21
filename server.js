var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];

let primaryId = 3;

// GET /api/owners
app.get('/api/owners', (req, res) => {
    res.status(200).send(owners);
});
// GET /api/owners/:id
app.get('/api/owners/:id', (req, res) => {
    const ownerId = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(ownerId);
    });

    res.status(200).send(
        owner
    );
    
});
// POST /api/owners
app.post('/api/owners', (req, res) => {

    owners.push({
        id: primaryId,
        name: req.body.name, 
        pets: req.body.pets
    });

    primaryId++;

    res.status(200).send(owners);
});
// PUT /api/owners/:id
app.put('/api/owners/:id', function (req, res) {   
    let objIndex = owners.findIndex(obj => obj.id === Number(req.params.id));
    owners[objIndex] = req.body;
    res.status(200).send(owners[objIndex]);
  });


// DELETE /api/owners/:id
app.delete('/api/owners/:id', function (req, res){
    const id = req.params.id;
    

    let owner = owners.find((owner) => {
        return owner.id === Number(id);
    });

    let ownerIndex = owners.findIndex((o) => {
        return o === owner;
    });

    if (ownerIndex > -1) {
        owners.splice(ownerIndex, 1);
    }
    
    res.status(200).send(owners);
});

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', (req, res) => {
    const ownerId = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(ownerId);
    });

    res.status(200).send(
        owner.pets
    );
    
});
// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', (req, res) => {
    const ownerId = req.params.id;
    const petId = req.params.petId;

    let owner = owners.find((owner) => {
        return owner.id === Number(ownerId);
    });

    let pet = owner.pets.find((pet) => {
        return pet.id === Number(petId);
    });

    res.status(200).send(
        pet
    );
    
});
// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', (req, res) => {
    const ownerId = req.params.id;

    let owner = owners.find((owner) => {
        return owner.id === Number(ownerId);
    });

    owner.pets.push({
        id: owner.pets.length + 1,
        name: req.body.name,
        type: req.body.type
    });

    res.status(200).send(
        owner.pets
    );
    
});
// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', function (req, res) {
    const ownerId = req.params.id;
    const petId = req.params.petId; 
    let ownerIndex = owners.findIndex(obj => obj.id === Number(ownerId));
    let petIndex = owners.findIndex(obj => obj.id === Number(petId));
    owners[ownerIndex].pets[petIndex] = req.body;
    res.status(200).send(owners[ownerIndex].pets[petIndex]);
  });
// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', function (req, res){
    const id = req.params.id;
    const petId = req.params.petId; 

    let owner = owners.find((owner) => {
        return Number(ownerId) === Number(owner.id);
    });

    let thisPet = owner.pets.find((pet) => {
        return Number(pet.id) === Number(petId);
    });

    let petIndex = owner.pets.findIndex((pet) => {
        return Number(pet.id) === Number(thisPet.id);
    });

    if(petIndex > -1) {
        owner.pets.splice(petIndex, 1);
        res.status(200).send(owner);
    }
    
    res.status(200).send(owners);
});

app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
});
const express = require('express');
const morgan = require('morgan');
const DAO = require('./DAO.js');
const PORT = 3001;

app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use(express.static('client'));

// GET /cars
app.get('/api/cars', (req, res)=>{
  DAO.listCars(req.query.filter)
    .then((cars) => {
        res.json(cars);
    })
    .catch((err) => {
        res.status(500).json({
        errors: [{'msg': err}],
        });
    });
});

// GET /cars/ filter with specific brand
  app.get('/api/cars/brand/:carBrand', (req, res) => {
    DAO.listCarsBrand(req.params.carBrand)
        .then((car) => {
            if(!car){
                res.status(404).send();
            } else {
                res.json(car);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

  // GET /cars/ filter with specific brand
  app.get('/api/cars/category/:carCategory', (req, res) => {
    DAO.listCarsCategory(req.params.carCategory)
        .then((car) => {
            if(!car){
                res.status(404).send();
            } else {
                res.json(car);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

app.get('/api/cars/:carId', (req, res) => {
    DAO.getCar(req.params.carId)
        .then((car) => {
            if(!car){
                res.status(404).send();
            } else {
                res.json(car);
            }
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            });
        });
});

// POST /cars
app.post('/api/cars', (req, res)=>{
  const car = req.body;
  if(!car){
    res.status(400).end();
} else {
    DAO.createCar(car)
        .then((id) => res.status(201).json({"id" : id}))
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
    }
});

app.put('/cars/:carId', (req,res) => {
    if(!req.body.id){
        res.status(400).end();
    } 
    else {
        const car = req.body;
        DAO.updateCar(req.params.carId,car)
        .then((result) => res.status(200).end())
        .catch((err) => res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        }));
    }
});


app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
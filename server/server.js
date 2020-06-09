const express = require('express');
const morgan = require('morgan');
const DAO = require('./DAO.js');
const PORT = 3010;

app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use(express.static('client'));
app.get('/', (req, res) => res.redirect('/public/index.html'));

// GET /cars
app.get('/cars', (req, res)=>{
  DAO.listCars().then((v)=>res.json(v));
});

// POST /cars
app.post('/cars', (req, res)=>{
  const car = req.body;
  console.log(req.body);
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
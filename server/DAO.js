'use strict';

const Car = require('./car');
const db = require('./db');

db.run('CREATE TABLE IF NOT EXISTS cars(id INTEGER PRIMARY KEY, brand TEXT, category TEXT, model TEXT)');

const createCar = function (row) {
    return new Car(row.id, row.category, row.brand, row.model);
}

exports.listCars = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM cars';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      const cars = rows.map((e) => (createCar(e)));
      resolve(cars);
    });
  });
};

exports.listCarsBrand = function (brand) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM cars WHERE brand = '" + brand.toString() + "';";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      const cars = rows.map((e) => (createCar(e)));
      resolve(cars);
    });
  });
};

exports.listCarsCategory = function (category) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM cars WHERE category = '" + category.toString() + "';";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      const cars = rows.map((e) => (createCar(e)));
      resolve(cars);
    });
  });
};

exports.getCar = function(id) {
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM cars WHERE id = ?";
      console.log(sql);
      db.all(sql, [id], (err, rows) => {
          if (err) 
              reject(err);
          else if (rows.length === 0)
              resolve(undefined);
          else{
              const car = createCar(rows[0]);
              resolve(car);
          }
      });
  });
}

exports.createCar = function (car) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO cars(brand, category, model) VALUES(?, ?, ?)';
    db.run(sql, [car.brand, car.category, car.model], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.updateCar = function(id, newCar) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE cars SET brand = ?, category = ?, model = ? WHERE id = ?';
        db.run(sql, [newCar.brand, newCar.category, newCar.model, id], function (err) {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(null);
        })
    });
}

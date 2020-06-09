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
        return;
      }
      const cars = rows.map((e) => ({ id: e.id, category: e.category, model: e.model, brand: e.brand }));
      resolve(cars);
    });
  });
};

exports.createCar = function (car) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO cars(brand, category, model) VALUES(?, ?, ?)';
    db.run(sql, [car.brand, car.category, car.model], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
      console.log(this.brand);
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

import React from 'react';
import CarItem from './CarItem';
import ListGroup from 'react-bootstrap/ListGroup';

const CarList = (props) => {

  let {cars} = props;

  return (
    <>
      {cars &&
      <ListGroup as="ul" variant="flush">
        {cars.map((car) => <CarItem key = {car.id} car = {car}/>) }
      </ListGroup>}
    </>
  );
}

export default CarList;

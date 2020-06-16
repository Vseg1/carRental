import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const CarItem = (props) => {

  let {car} = props;

  return (
    <ListGroup.Item id = {car.id}>
      <div className="d-flex w-100 justify-content-between">
          <div className="custom-control custom-checkbox">
            <label className="custom-control-label"  htmlFor={"check-t" +  car.id}> Car : {car.brand}, Model : {car.model}, Category : {car.category}</label>
          </div>
        </div>
    </ListGroup.Item>
  );
}
export default CarItem;

import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

class Filters extends React.Component {
    constructor() {
        super();
        /* 1. Initialize Ref */
        this.textInput = React.createRef(); 
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
     }

     handleChangeFilter(event){
        const value = event.target.value;
        this.props.newFilter(value);
     }

     handleChangeParam() {
        /* 3. Get Ref Value here (or anywhere in the code!) */
        const value = this.textInput.current.value;
        this.props.newParam(value);
     }

    render() {
        return (
            <>
            <ListGroup  variant="flush">
                    <Form>
                        <Form.Group controlId="ControlSelectFilter">
                            <Form.Label>Choose your filter :</Form.Label>
                            <Form.Control onChange={this.handleChangeFilter} as="select" defaultValue="All">
                                <option>All</option>
                                <option>Brand</option>
                                <option>Category</option>
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="controlInput">
                            <Form.Label>Filter parameter :</Form.Label>
                            <Form.Control ref={this.textInput} defaultValue={''} onChange={() => this.handleChangeParam()} placeholder="type query" type="text"/>
                        </Form.Group>

                        <ListGroup.Item id = "filter-shared" onClick = {() => {this.props.filterCar(this.props.activeFilter, this.props.activeParam)}}>Submit</ListGroup.Item>

                    </Form>
                </ListGroup>
            </>
        );
    }
}

export default Filters;
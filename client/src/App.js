import React, { Component } from 'react';
import Header from './components/Header';
import Filters from './components/Filter';
import API from './api/API';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import CarList from './components/CarList';

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = {cars:[], filter: 'All', parameter: '', openMobileMenu: false, modalOpen: false, editedTask: null};
  }
  componentDidMount() {
    API.getCars(this.state.filter, this.state.param).then((cars) => this.setState({cars:cars}));
  }

  toggleModal = () => {
    this.setState((state) => ({modalOpen: !state.modalOpen, editedTask: null}));
  }

  newFilter = (newfilter) => {
    this.setState(() => ({filter : newfilter}));
  }

  newParam = (newparam) => {
    this.setState(() => ({parameter : newparam}));
  }

  filterCar = (filter, param) => {
    console.log('filter : ' + filter);
    console.log('param : ' + param);
    switch(filter){
      case 'Brand':
        console.log('okbrand');
        API.getCars('brand', param).then((cars) => this.setState({cars: cars, filter: 'Brand'}));
        break;
      case 'Category':
        console.log('okcategory');
        API.getCars('category', param).then((cars) => this.setState({cars: cars, filter: 'Category'}));
        break;
      default:
        API.getCars('all', param).then((cars) => this.setState({cars: cars, filter: 'All'}));
        break;
    }
  }

  render() {
    return (
      <>
        <Header/>
          <Container fluid>
          <Row className="vheight-100">
            <Collapse in={this.state.openMobileMenu}>
              <Col bg="light" id="left-sidebar" className="collapse d-sm-block below-nav">
                <Filters filterCar = {this.filterCar} activeFilter = {this.state.filter} activeParam = {this.state.parameter} newFilter={this.newFilter} newParam={this.newParam}/>
              </Col>
            </Collapse>
            <Col sm={8} className="below-nav">
              <h3>Filter by : {this.state.filter}</h3>
              <h3>param : {this.state.parameter} </h3>
              <CarList cars = {this.state.cars} /*editCar = {this.editCar} updateCar = {this.addOrEditTask} deleteCar = {this.deleteCar}*//>
            </Col>
          </Row>
          </Container>
        </>
    );
  }
}
export default App;
import React from 'react';
import NewKegForm from './NewKegForm.js';
import KegList from './KegList.js';
import KegDetail from './KegDetail.js';
import EditKegForm from './EditKegForm.js';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeg: null, 
      editing: false
    };
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.masterKegList[id];
    this.setState({selectedKeg: selectedKeg});
  }
  handleClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
    this.setState({ selectedKeg: null });
  }
  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const { id, name, brand, price, alcoholContent, count } = newKeg;
    const action = a.addKeg(newKeg);
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteKeg(id);
    
    dispatch(action);
    this.setState({ selectedKeg: null });
  }

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const { id, name, brand, price, alcoholContent, count } = kegToEdit;
    const action = a.addKeg(kegToEdit);
    dispatch(action);
    this.setState({ 
      editing: false,
      selectedKeg: null
    });
  }

  handleKegPurchase = (id) => {

    const currentlySelectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    const newQuantityOfPints = currentlySelectedKeg.quantity - 1;
    const updatedKeg = {...currentlySelectedKeg, quantity: newQuantityOfPints};
    const previousKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: [...previousKegList, updatedKeg],
      selectedKeg: updatedKeg
    });
  }

  handleKegRefill = (id) => {
    const currentlySelectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    const newQuantityOfPints = currentlySelectedKeg.quantity + 10;
    const updatedKeg = {...currentlySelectedKeg, quantity: newQuantityOfPints };
    const previousKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: [...previousKegList, updatedKeg],
      selectedKeg: updatedKeg
    });
  }

  render() {

    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditKegForm 
        keg = {this.state.selectedKeg} 
        onEditKeg = {this.handleEditingKegInList} />
      buttonText = "Return to Kegs";

    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = <KegDetail 
        keg = {this.state.selectedKeg} 
        onClickingDelete={this.handleDeletingKeg} 
        onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Kegs";

    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm 
        onNewKegCreation={this.handleAddingNewKegToList} />
      buttonText = "Return to Keg List";
      
    } else {
      currentlyVisibleState = <KegList
        kegList={this.props.masterKegList}
        onKegSelection={this.handleChangingSelectedKeg} 
        onClickingSell={this.handleKegPurchase}
        onClickingRefill={this.handleKegRefill} />
      buttonText = "Add new Keg";
    }

    return (
      <React.Fragment>
          {currentlyVisibleState}
          <button onClick ={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterKegList: state.masterKegList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;  
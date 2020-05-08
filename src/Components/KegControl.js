import React from 'react';
import NewKegForm from './NewKegForm.js';
import EditKegForm from './EditKegForm.js';
import KegList from './KegList.js';
import KegDetail from './KegDetail.js';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterKegList: [],
      selectedKeg: null,
      editing: false
    };
  } 

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(Keg => Keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  handleClick = () => {
    if (this.state.selectedKeg != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }
  handleAddingNewKegToList = (newKeg) => {
    const newMasterKegList = this.state.masterKegList.concat(newKeg);
    this.setState({masterKegList: newMasterKegList, formVisibleOnPage: false});
  }

  handleDeletingKeg = (id) => {
    const newMasterKegList = this.state.masterKegList.filter(Keg => Keg.id !== id);
    this.setState({masterKegList: newMasterKegList});
    this.setState({selectedKeg: null});
  }

  handleEditingKegInList = (KegToEdit) => {
    const editedMasterKegList = this.state.masterKegList
      .filter(Keg => Keg.id !== this.state.selectedKeg.id)
      .concat(KegToEdit);
      this.setState({masterKegList: editedMasterKegList, editing: false, selectedKeg: null});
  }

  handleKegPurchase = (id) => {
    console.log(id);
    const currentlySelectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    console.log(currentlySelectedKeg);
    console.log(this.state.masterKegList);
    const newQuantityOfKeg = currentlySelectedKeg.count - 1;
    const updatedKeg = {...currentlySelectedKeg, count: newQuantityOfKeg};
    const previousKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: [...previousKegList, updatedKeg],
      selectedKeg: updatedKeg
    });
  }

  handleKegRefill = (id) => {
    const currentlySelectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    const newQuantityOfKeg = currentlySelectedKeg.quantity + 10;
    const updatedKeg = {...currentlySelectedKeg, quantity: newQuantityOfKeg };
    const previousKegList = this.state.masterKegList.filter(keg => keg.id !== id);
    this.setState({
      masterKegList: [...previousKegList, updatedKeg],
      selectedKeg: updatedKeg
    });
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = 
      <EditKegForm 
      Keg={this.state.selectedKeg} 
      onEditKeg = {this.handleEditingKegInList} />
      buttonText = "Return to Keg List";
    } else if (this.state.selectedKeg != null) {
      currentlyVisibleState = 
      <KegDetail 
      keg={this.state.selectedKeg} 
      onClickingDelete={this.handleDeletingKeg} 
      onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Keg List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewKegForm 
      onNewKegCreation={this.handleAddingNewKegToList} />
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = <KegList kegList={this.state.masterKegList} 
      onKegSelection={this.handleChangingSelectedKeg} 
      onClickingSell={this.handleKegPurchase}
      onClickingRefill={this.handleKegRefill} />
      buttonText = "Add Keg"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default KegControl;

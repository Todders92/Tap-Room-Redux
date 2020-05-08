import React from "react";
import PropTypes from "prop-types";

function Keg(props) {
  return (
    <React.Fragment>
      <div>
        <h3 className="clickable" >
          {props.name} - {props.brand}
        </h3>
        <p>
          <em>{props.price}</em>
        </p>
        <p>{props.count}</p>
          <div className="buttons">
            <button onClick={()=> props.whenSellClicked(props.id)} type="submit">Sell Pint</button>
            <button onClick={()=> props.whenRefillClicked(props.id)} type="submit">Refill Keg</button> 
            <button onClick={() => props.whenKegClicked(props.id)} type="submit">Details</button> 
          </div>
        </div>
        <hr />
    </React.Fragment>
  );
}

Keg.propTypes = {
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  alcoholContent: PropTypes.string,
  count: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  whenKegClicked: PropTypes.func,
  whenSellClicked: PropTypes.func,
  whenRefillClicked: PropTypes.func
};

export default Keg;
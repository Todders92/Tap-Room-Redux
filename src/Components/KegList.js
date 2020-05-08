import React from "react";
import Keg from "./Keg";
import PropTypes from "prop-types";

function KegList(props) {
  return (
    <React.Fragment>
      {Object.values(props.kegList).map((keg) => {
        return <Keg
          whenSellClicked = {props.onClickingSell}
          whenRefillClicked = {props.onClickingRefill} 
          whenKegClicked={ props.onKegSelection }
          name={keg.name}
          brand={keg.brand}
          price={keg.price}
          alcoholContent={keg.alcoholContent}
          count={keg.count}
          id={keg.id}
          key={keg.id} />
      })}
    </React.Fragment>
  );
}

KegList.propTypes = {
  kegList: PropTypes.object,
  onKegSelection: PropTypes.func,
  onClickingRefill: PropTypes.func,
};

export default KegList;
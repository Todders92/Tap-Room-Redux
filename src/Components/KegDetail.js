import React from "react";
import PropTypes from 'prop-types';

function KegDetail(props){
   const { keg, onClickingDelete, onClickingEdit } = props;
  
  return (
    <React.Fragment>
      <h1>Keg Details</h1>
      <h3>{keg.brand} - {keg.name}</h3>
      <p>{keg.price}</p>
      <p>{keg.count}</p>
      <button onClick={()=> onClickingEdit(keg) }>Update Keg</button>
      <button onClick={()=> onClickingDelete(keg.id) }>Destroy Keg</button>
      <hr />
    </React.Fragment>
  );
}

KegDetail.propTypes = {
  keg: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default KegDetail;
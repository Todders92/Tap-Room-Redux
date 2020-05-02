export default (state = {}, action) => {
  const { name, brand, price, alcoholContent, count, id } = action;
  switch (action.type) {
  case 'ADD_KEG':
    return Object.assign({}, state, {
      [id]: {
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      count: count,
      id: id
      }
    });
    case 'DELETE_KEG':
    const newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};
export default (state = {}, action) => {
  switch (action.type) {
  case 'ADD_KEG':
    const { name, brand, price, alcoholContent, count, id } = action;
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
  default:
    return state;
  }
};
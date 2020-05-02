import kegListReducer from '../../reducers/keg-list-reducer';

describe('kegListReducer', () => {

  let action;
  const kegData = {
    name: "dead guy ale",
    brand: "rogue Brewing",
    price: "6.00",
    alcoholContent: "6.7%",
    count: "123",
    id: 1,
  };

  const currentState = {
    1: {name: "dead guy ale",
    brand: "rogue Brewing",
    price: "6.00",
    alcoholContent: "6.7%",
    count: "123",
    id: 1},
    2: {name: "pilsner",
    brand: "crux",
    price: "5.00",
    alcoholContent: "5.2%",
    count: "124",
    id: 2}
  }

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });

  test('should successfully add new keg data to masterKegList', () => {
    const { name, brand, price, alcoholContent, count, id } = kegData;
    action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      count: count,
      id: id
    };
    expect(kegListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        count: count,
        id: id
      }
    })
  });

  test('should successfully delete a keg', () => {
    action = {
      type: 'DELETE_KEG',
      id: 1
    };
    expect(kegListReducer(currentState, action)).toEqual({
      2: {name: "pilsner",
      brand: "crux",
      price: "5.00",
      alcoholContent: "5.2%",
      count: "124",
      id: 2}
    });
  });

});
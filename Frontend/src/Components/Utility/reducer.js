import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  console.log("Action received:", action);
  console.log("Current state:", state);

  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        const newState = {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
        console.log("New state:", newState);
        return newState;
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );

        const newState = {
          ...state,
          basket: [...updatedBasket],
        };
        console.log("New state:", newState);
        return newState;
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket]; // Clone array before modifying

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket = newBasket.filter((item) => item.id !== action.id); // Remove item safely
        }
      }
      return {
        ...state,
        basket: [...newBasket], // Return a new array reference
      };
    }

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

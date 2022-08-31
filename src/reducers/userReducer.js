import { TYPES } from "../actions/userActions";
//import { ActionType } from "../components/types";
export const userInitialState = {
  db: [],
  
};

export function userReducer(state , action) {
    switch (action.type) {
      case TYPES.CONSULTAR_PRODUCTO: {
        return {
          ...state,
          db: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CREAR_PRODUCTO: {
        return {
          ...state,
         // db: [action.payload, ...state.db],
        };
      }
    }
}
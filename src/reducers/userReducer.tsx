import { TYPES } from "../actions/userActions";
import { Action } from "../components/types";
export const productInitialState = {
  db: [],
  
};

export function productReducer(state:any, action:Action) {
    switch (action.type) {
      case TYPES.CONSULTAR_PRODUCTO: {
        return {
          ...state,
          db: action.payload.map((producto:any) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
    }
}
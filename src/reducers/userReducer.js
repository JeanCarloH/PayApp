import { TYPES } from "../actions/userActions";
//import { ActionType } from "../components/types";
export const userInitialState = {
  db: [],
  dbnote:[],
  dbpayments:[],
};

export function userReducer(state , action) {
    switch (action.type) {
      case TYPES.CONSULTAR_PRODUCTO: {
        return {
          ...state,
          db: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CONSULTAR_NOTAS: {
        return {
          ...state,
          dbnote: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CONSULTAR_PAGOS: {
        return {
          ...state,
          dbpayments: [action.payload],
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
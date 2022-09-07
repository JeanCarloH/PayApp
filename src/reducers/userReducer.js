import { TYPES } from "../actions/userActions";
//import { ActionType } from "../components/types";
export const userInitialState = {
  db: [],
  dbnote:[],
  dbpayments:[],
  dbusersready:[],
  dbstatistics:[],
  dbmora:[],
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
          dbpayments: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CONSULTAR_USUARIOSLISTOS: {
        return {
          ...state,
          dbusersready: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CONSULTAR_ESTADISTICAS: {
        return {
          ...state,
          dbstatistics: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.CONSULTAR_USUARIOSMORA: {
        return {
          ...state,
          dbmora: action.payload.map((producto) =>  ({ id: producto.id, ...producto.data() })),
        };
      }
      case TYPES.ELIMINAR_NOTA: {
        return {
          ...state,
          dbnote: state.dbnote.filter((nota) => (nota.id !== action.payload)),
        };
      }
      case TYPES.ELIMINAR_USUARIO: {
        return {
          ...state,
          db: state.db.filter((user) => (user.id !== action.payload)),
        };
      }
      case TYPES.ELIMINAR_PAGO: {
        return {
          ...state,
          dbpayments: state.dbpayments.filter((payments) => (payments.id !== action.payload)),
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
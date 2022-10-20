import { ProductsActionTypes } from "./product.types";

const INITIAL_STATE = {
  isProductsPending: false,
  products: [],
  productsError: false,

  isProductPending: false,
  product: {},
  productError: false,
};

const ProductsReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {

    case ProductsActionTypes.GET.GET_PRODUCT_PENDING:
      console.log('a');
      return {
        ...state,
        isProductsPending: true,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_SUCCESS:
      console.log('b');
      return {
        ...state,
        isProductsPending: false,
        products: action.payload,
        productsError: null,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_ERROR:
      console.log('c');
      return {
        ...state,
        isProductsPending: false,
        productsError: action.payload,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_PENDING:
      console.log('d');
      return {
        ...state,
        isProductPending: true,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_SUCCESS:
      console.log('e');
      return {
        ...state,
        isProductPending: false,
        product: action.payload,
        productError: null,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_ERROR:
      console.log('f');
      return {
        ...state,
        isProductPending: false,
        productError: action.payload,
      };

    default:
      console.log('g');
      return state;
  }
};

export default ProductsReducer;

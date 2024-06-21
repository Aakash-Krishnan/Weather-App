export function locationReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        spinner: true,
        locationError: {},
      };
    case "SUCCESS":
      return {
        spinner: false,
        locationDetails: action.payload,
        locationError: {},
      };
    case "ERROR":
      return {
        spinner: false,
        locationDetails: {},
        locationError: action.payload,
      };
    default:
      return state;
  }
}

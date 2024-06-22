export function locationReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        locationError: {},
      };
    case "SUCCESS":
      return {
        isLoading: false,
        locationDetails: action.payload,
        locationError: {},
      };
    case "ERROR":
      return {
        isLoading: false,
        locationDetails: {},
        locationError: action.payload,
      };
    default:
      return state;
  }
}

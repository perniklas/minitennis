export function firestoreReducer(state: any, action: any) {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
}
export default function(state = false, action) {
  switch (action.type) {
    case 'doVoid':
      return action.payload || false;
    default:
      return state;
  }
}

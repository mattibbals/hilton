export default (state = {}, action) => {
 switch (action.type) {
  case 'GUEST_ACTION':
  	let newState = Object.assign({}, state);
  	newState.rooms[(action.payload.num-1)][(action.payload.type)] = action.payload.val;
  	return newState;
  default:
   return state
 }
}
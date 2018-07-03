export default (state = {}, action) => {
 switch (action.type) {
  case 'ROOM_ACTION':
   let newState = Object.assign({}, state);
   for (let i = newState.rooms.length -1; i>(action.payload.num - 1); i--) {
   	newState.rooms[i].enabled = false;
   }   //  turn off all higher rooms in all cases
   if (action.payload.val) {  //turning it on, turn on all lower ones
	   for(let i = (action.payload.num - 1); i > 0; i--) {
	   	 newState.rooms[i].enabled = true;
	   }   	
   } else {   //turning it off, only turn off that one
   		newState.rooms[action.payload.num-1].enabled = false;
   }






   return newState;
  default:
   return state;
 }
}
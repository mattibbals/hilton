import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState={}) {

 const store = createStore(
  rootReducer,
  initialState,
   applyMiddleware(thunk)
 );
/*
 store.subscribe(() => {
 	
 	const myStore = store.getState();
 	console.log(myStore.roomReducer)
 	for(let i=0; i<myStore.roomReducer.rooms.length; i++) {
 		console.log('here');
 		if (myStore.roomReducer.rooms[i].enabled === false) {
 		//	store.dispatch({type: 'GUEST_ACTION', payload:{num: i+1 , val: 1, type: 'adults'}});
 		//	store.dispatch({type: 'GUEST_ACTION', payload:{num: i+1 , val: 0, type: 'children'}});
 		}
 	}
 });
*/
 return store;
}

/*

export default function configureStore(initialState={}) {
 return createStore(
  rootReducer,
   applyMiddleware(thunk)
 );
}
*/
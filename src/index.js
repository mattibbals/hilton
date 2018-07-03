import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import ls from 'local-storage';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function getInitialRooms(inNumberRooms) {
		let initial_rooms = [];
	if (ls.get('saved_state') !== null) {
		return ls.get('saved_state').guestReducer.rooms;
	} else {
		for(let i=0;i<inNumberRooms;i++) {
		  initial_rooms.push({number : (i+1), adults: 1, children: 0});
		}
	}
	return initial_rooms;
}

function getInitialActiveRooms(inNumberRooms) {
	let initial_rooms = [];
	if (ls.get('saved_state') !== null) {
		initial_rooms = ls.get('saved_state').roomReducer.rooms;
	} else {
		for(let i=0;i<inNumberRooms;i++) {
		  initial_rooms.push({number : (i+1), enabled: false});
		}		
	}
	initial_rooms[0].enabled = true;
	return initial_rooms;
}

ReactDOM.render(
 <Provider store={configureStore({roomReducer:{rooms:getInitialActiveRooms(4)}, guestReducer:{rooms:getInitialRooms(4)}})}>
  <App />
 </Provider>,
 document.getElementById('root')
);
registerServiceWorker();

/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/



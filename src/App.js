import React, { Component } from 'react';
import { connect } from 'react-redux';
import ls from 'local-storage';
import { roomAction } from './actions/roomAction';
import { guestAction } from './actions/guestAction';
//import logo from './logo.svg';
import './App.css';

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  guestAction: (event) => dispatch(guestAction(event)),
 roomAction: (event) => dispatch(roomAction(event))
})

  const guest_type_label = {
    adults : "Adults (18+)",
    children : "Children (0-17)"
  };

class NumGuestOption extends Component {
  clickedNumGuestOption = (event) => {
   this.props.clickedNumGuestOption(event);
  };
  render() {
    return (
      <div className={"NumGuestOption" + (this.props.isEnabled ? ' enabled' : '')}>
        <div>{guest_type_label[this.props.option_label]}</div>
        <select  onChange={(event) => {this.clickedNumGuestOption.bind(this)({num: this.props.option_number , val: event.target.value, type: this.props.option_label})} } disabled={!this.props.isEnabled} value={this.props.option_value ? this.props.option_value : ''}>
          {this.props.option_label === 'children' ? <option value="0">0</option> : null}
          <option value="1">1</option>
          <option value="2">2</option>
          {this.props.option_label === 'children' ? <option value="3">3</option> : null}
          {this.props.option_label === 'children' ? <option value="4">4</option> : null}
        </select>
      </div>
    )
  }
}

class Room extends Component {
  clickedExtraRoom = (event) => {
   this.props.clickedExtraRoom(event);
   console.log('clickedExtraRoom', event);
   if (!event.val) {  //turning it off
     for (let i = event.num-1; i<=3; i++) {
         this.props.clickedNumGuestOption({num: i+1 , val: 1, type: 'adults'});
         this.props.clickedNumGuestOption({num: i+1 , val: 0, type: 'children'});
     }

   }




  };
 render() {
  return (
   <div className={"Room" + (this.props.enabled ? ' enabled' : '')}>
    <div className="room_header">
      {this.props.room.number !== 1 ? <input onChange={(event) => {this.clickedExtraRoom.bind(this)({num: this.props.room.number, val: event.target.checked})}} checked={this.props.enabled} id={'room_' + this.props.room.number} type="checkbox" /> : null}
      <label htmlFor={'room_' + this.props.room.number}>{'Room ' + this.props.room.number}</label>      
    </div>
    <NumGuestOption option_number={this.props.room.number} clickedNumGuestOption={this.props.clickedNumGuestOption} isEnabled={this.props.enabled} option_label="adults" option_value={(this.props.room.adults && this.props.enabled) ? this.props.room.adults : 1} />
    <NumGuestOption option_number={this.props.room.number} clickedNumGuestOption={this.props.clickedNumGuestOption} isEnabled={this.props.enabled} option_label="children" option_value={(this.props.room.children && this.props.enabled) ? this.props.room.children : 0} />
   </div>
  );
 }
}

class App extends Component {
  clickedExtraRoom = (event) => {
   this.props.roomAction(event);
  };
  clickedNumGuestOption = (event) => {
   this.props.guestAction(event);
  };
  saveToLocalStorage = () => {
    ls.set('saved_state', {guestReducer: this.props.guestReducer, roomReducer: this.props.roomReducer} );
  };
  render() {
    const rooms = this.props.guestReducer.rooms.map((room, i) => <Room clickedExtraRoom={this.clickedExtraRoom} clickedNumGuestOption={this.clickedNumGuestOption} key={'room_'+i} room={room} enabled={this.props.roomReducer.rooms[i].enabled} />);
    return (
     <div className="App">
      <img alt="Hotel Chicago" src={require("./images/hotelexterior.jpg")}/>
      <div className="hotel_name">Hilton Chicago</div>
      <div className="hotel_address">720 South Michigan Avenue</div>
      <div className="hotel_address">Chicago, Illinois, 60605</div>
      <a className="hotel_phone" href="tel:13129224400">1-312-922-4400</a>
      <ul>
        <li>Map<span>></span></li>
        <li>Photo gallery<span>></span></li>
        <li>Amenities<span>></span></li>
      </ul>
      {rooms}
      <button onClick={this.saveToLocalStorage}>Submit</button>
     </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
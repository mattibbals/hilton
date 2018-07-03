export const roomAction = (inEvent) => dispatch => {
 dispatch({
  type: 'ROOM_ACTION',
  payload: inEvent
 })
}
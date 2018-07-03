export const guestAction = (inEvent) => dispatch => {
 dispatch({
  type: 'GUEST_ACTION',
  payload: inEvent
 })
}
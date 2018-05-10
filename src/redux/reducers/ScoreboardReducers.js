export const ScoreboardReducer = (state=initial_state, action) => {
  switch (action.type) {
    case 'GET_PLAYERS':
      console.log("Getting players");
      return state;
    default:
      return state;
  }
};

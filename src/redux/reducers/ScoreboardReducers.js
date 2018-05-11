const scoreboard_initial_state = {
  players: []
};

export const ScoreboardReducer = (state=scoreboard_initial_state, action) => {
  console.log("Now in ScoreboardReducer");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'UPDATE_PLAYERS':
      console.log("Updating players");
      return action.payload;
    default:
      return state;
  }
};

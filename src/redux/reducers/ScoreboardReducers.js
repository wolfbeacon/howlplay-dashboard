const scoreboard_initial_state = {
  url : "",
  id : ""
};

export const ScoreboardReducer = (state=scoreboard_initial_state, action) => {
  switch (action.type) {
    case 'SET_URL':
      console.log("Setting url");
      return {...state, url : action.payload.url, id : action.payload.id}
    default:
      return state;
  }
};

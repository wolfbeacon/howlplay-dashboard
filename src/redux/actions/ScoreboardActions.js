export function updatePlayers(players) {
  console.log("Now in getPlayers");
  return {
    type : 'UPDATE_PLAYERS',
    payload : players
  }
}

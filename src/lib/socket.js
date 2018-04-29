class ScoreBoardSocketApi {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.socket.binarytype = "blob";

    // Replace/remove it whenever
    this.socket.onopen = () => {
      this.socket.send("Hello World");
    };

    this.socket.onmessage = (e) => {
      console.log(e.data);
      switch(e.data) {
        case 0:
          console.log("player joined quiz");
          break;
        case 1:
          console.log("player left quiz");
          break;
        default:
          break;
      }
    }
  }
}

export default ScoreBoardSocketApi;

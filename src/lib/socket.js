class ScoreBoardSocketApi {
  constructor(url) {
    this.socket = new WebSocket(url);

    // This is just to prevent warnings with Travis. Replace/remove it whenever
    this.socket.onopen = () => {
      this.socket.send("Hello World");
    };
  }
}

export default ScoreBoardSocketApi;

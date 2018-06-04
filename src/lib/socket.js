class ScoreBoardSocketApi {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.socket.binaryType = 'arraybuffer';

    this.socket.sendCode = (code) => {
      if (this.socket.readyState === 1) {
        console.log(code + " - Sent");
        var payload = new Uint8Array([code]);
        this.socket.send(payload);
      }
    }
  }
}

export default ScoreBoardSocketApi;

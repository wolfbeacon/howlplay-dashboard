

class ScoreBoardSocketApi {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.socket.binaryType = 'arraybuffer';

    this.socket.sendCode = (code) => {
      var payload = new Uint8Array([code]);
      this.socket.send(payload);
    }
  }
}

export default ScoreBoardSocketApi;

export default class LoggerMock {

  constructor() {
    this.logged = [];
  }

  log(message, data) {
    this.logged.push({
      message: message,
      data: data
    })
  }
  
}

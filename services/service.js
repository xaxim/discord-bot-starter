const sessions = [];

let bot;

class Service {

  static newSession(client) {
    bot = client;
    sessions.push(Date.now());
    return sessions;
  }

  static getSessions() {
    return sessions;
  }

  static getBot() {
    return bot;
  }

}

module.exports = Service;


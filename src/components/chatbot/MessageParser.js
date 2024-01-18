// chatbot/MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hola")) {
      this.actionProvider.greet();
    }
    // Agrega más condiciones según sea necesario
  }
}

export default MessageParser;

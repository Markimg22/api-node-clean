export abstract class Message {
  private message: string;
  name: string = '';

  constructor(message: string) {
    this.message = message;
  }
}

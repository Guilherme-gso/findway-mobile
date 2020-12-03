import { IMessage } from 'react-native-gifted-chat';
import app from './app';

export interface IReceptor {
  id: string;
  name: string;
  avatar_url: string;
}

const ref = app.database().ref('messages');

export function append(message: any): void {
  ref.push(message);
}

export function send(messages: IMessage[], receptor: IReceptor): void {
  messages.forEach(message => {
    const msg = {
      text: message.text,
      user: message.user,
      timestamp: new Date(),
      receptor,
    };

    append(msg);
  });
}

export function parse(snapshot: any): any {
  const { timestamp: numberStamp, text, user } = snapshot.val();
  const { key: _id } = snapshot;
  const timestamp = new Date(numberStamp);
  const message = {
    _id,
    timestamp,
    text,
    user,
  };
  return message;
}

export function on(cb: any): void {
  ref.limitToLast(20).on('child_added', snap => cb(parse(snap)));
}

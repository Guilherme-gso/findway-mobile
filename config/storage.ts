import firebase from 'firebase/app';
import 'firebase/storage';
import app from './app';

const storage = firebase.storage(app);

export default storage;

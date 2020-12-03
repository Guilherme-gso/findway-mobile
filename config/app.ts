import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAF3TB4n6Sh_D_YncI9you8jQGoSqRe1sk',
  authDomain: 'findway-df638.firebaseapp.com',
  databaseURL: 'https://findway-df638.firebaseio.com',
  projectId: 'findway-df638',
  storageBucket: 'findway-df638.appspot.com',
  messagingSenderId: '113654775568',
  appId: '1:113654775568:web:8b8a8f8d82b7b0b00b6f95',
  measurementId: 'G-CFHPWYF1R3',
};

const app = firebase.initializeApp(config);

export default app;

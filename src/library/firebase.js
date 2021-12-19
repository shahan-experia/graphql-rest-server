import admin from 'firebase-admin';
import { firebaseServiceKeys } from '../config';

const { databaseURL, ...serviceKeys } = firebaseServiceKeys;

admin.initializeApp({
	credential: admin.credential.cert(serviceKeys),
	databaseURL,
});

export default admin;

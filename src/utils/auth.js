import { redis, firebase } from '../library';
import RootUtils from './root';

class Auth extends RootUtils {
	signOut(tokenKey) {
		return new Promise((resolve, reject) => {
			redis
				.del(tokenKey)
				.then(() => resolve("You've successfully signed out."))
				.catch(reject);
		});
	}

	async firebaseAuth(firebaseToken, user) {
		if (user.firebase_uid) throw new Error("You've already login with social...");

		const { uid } = await firebase.auth().verifyIdToken(firebaseToken);

		const userRecord = await this.getFirebaseUser(uid);

		return this.getOrCreateUser(userRecord, user);
	}

	async getFirebaseUser(uid) {
		return firebase
			.auth()
			.getUser(uid)
			.then((userRecord) => userRecord.toJSON());
	}

	getOrCreateUser({ uid, email, displayName, phoneNumber, photoURL, providerData }) {
		const [provider] = providerData.map(({ providerId }) => providerId);

		const upsertData = {
			provider: provider.split('.')[0].toUpperCase(),
			uid,
			displayName,
			email,
			phoneNumber,
			photoURL,
		};

		return upsertData;
	}
}

export default new Auth();

import { redis, firebase, prisma } from '../library';
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

	async firebaseAuth(firebaseToken) {
		const { uid } = await firebase.auth().verifyIdToken(firebaseToken);

		const userRecord = await firebase
			.auth()
			.getUser(uid)
			.then((userRecord) => userRecord.toJSON());

		return this.getOrCreateUser(userRecord);
	}

	async getOrCreateUser({
		uid: firebaseUID,
		email,
		displayName: fullName,
		phoneNumber: cell,
		photoURL: avatar,
		providerData,
	}) {
		const [provider] = providerData.map(({ providerId }) => providerId);

		const data = {
			signUpType: provider.split('.')[0].toUpperCase(),
			firebaseUID,
			fullName,
			email,
			cell,
			avatar,
		};

		let user = await prisma.user.findFirst({ where: { firebaseUID, isDeleted: { not: true } } });
		if (!user) user = await prisma.user.create({ data });

		delete user.password;
		return user;
	}
}

export default new Auth();

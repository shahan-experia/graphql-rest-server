import logics from './logics';
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

		const userRecord = await firebase.auth().getUser(uid);

		return this.getOrCreateUser(userRecord.toJSON());
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
			createdAt: logics.getZeroTimeZoneDate(),
			updatedAt: logics.getZeroTimeZoneDate(),
		};

		let user = await prisma.user.findFirst({ where: logics.includePreWhere({ firebaseUID }) });
		if (!user) user = await prisma.user.create({ data });

		return logics.excludePropsFromUser(user);
	}
}

export default new Auth();

import 'dotenv/config';

import chai from 'chai';
import { BASE_URL } from '../../config';
import { common } from '../helper';

const { expect } = chai;

describe('Common routes APIs', function () {
	this.timeout(0);
	this.slow(1000);

	it(`${BASE_URL}/api/common/images => POST => should success`, async () => {
		try {
			const { body, error } = await common.uploadImage();

			expect(error).to.be.false;
			expect(body.path).to.be.a('string');
		} catch (error) {
			console.error(error);
			expect(true).to.be.false;
		}
	});
});

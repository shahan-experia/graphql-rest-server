import { existsSync, mkdirSync, unlinkSync, readFileSync, rename } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

class File {
	constructor() {
		this.tempPath = path.resolve(__dirname, '..', 'temp');
		this.uploadPath = path.resolve(__dirname, '..', 'upload');
	}

	localUpload(image, old) {
		// deleting if old file is given
		if (old) this.deleteOldFileLocally(old);

		const imageFile = image.uploadedFileName;
		const filename = `${uuid()}-${imageFile.name}`;

		if (!existsSync(this.tempPath)) mkdirSync(this.tempPath);

		return new Promise((resolve, reject) => {
			const uploadFile = path.join(this.tempPath, filename);
			imageFile
				.mv(uploadFile) // Use the mv() method to place the file somewhere
				.then(() => resolve('temp/' + filename))
				.catch(reject);
		});
	}

	deleteOldFileLocally(imagePath) {
		const path = `./src/${imagePath}`;
		if (existsSync(path)) {
			unlinkSync(path);
			return true;
		}

		return false;
	}

	getFileBuffer(imagePath) {
		const path = `./src/${imagePath}`;
		if (existsSync(path)) return readFileSync(path);

		return readFileSync(`./src/assets/404-image.png`);
	}

	moveImageFromTmp(imagePath) {
		return new Promise((resolve, reject) => {
			const currentPath = path.join(this.tempPath, imagePath);
			if (!existsSync(currentPath)) reject(new Error('Image not found'));
			else {
				const destPath = path.join(this.uploadPath, imagePath);
				if (!existsSync(this.uploadPath)) mkdirSync(this.uploadPath);

				rename(currentPath, destPath, (err) => {
					if (err) reject(new Error(err));
					resolve();
				});
			}
		});
	}
}

const file = new File();

export default file;

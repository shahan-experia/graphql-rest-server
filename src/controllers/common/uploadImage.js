import { file } from '../../utils';

async function uploadImage(req, res) {
	const path = await file.localUpload(req.files);
	res.status(200).json({ path });
}

export default uploadImage;

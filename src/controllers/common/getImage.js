import { file } from '../../utils';

function getImage(req, res) {
	const fileBuffer = file.getFileBuffer(req.query.filename);
	res.send(fileBuffer);
}

export default getImage;

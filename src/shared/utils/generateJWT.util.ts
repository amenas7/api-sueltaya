import jwt from 'jsonwebtoken';

function generateJWT(uid: string, email: string): Promise<string>{
	return new Promise((resolve, reject) => {
		const payload = { uid, email }
		jwt.sign(payload, 'D1pl0Mad0', { expiresIn: '1d' }, (err, enconded) => {
			if(err){
				reject(err)
				return;
			}
			resolve(enconded!);
		});
	})
}

export default generateJWT;
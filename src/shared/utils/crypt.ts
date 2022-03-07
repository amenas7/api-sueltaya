import bcrypt from 'bcrypt';

function encrypt(text: string): string {
	const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync( text, salt );
}

function comparar(hash: string, compare: string): boolean {
	const resultado = bcrypt.compareSync(hash, compare);
	if(resultado ){
		return true;
	}
	return false;
}

export {
	encrypt,
	comparar
}
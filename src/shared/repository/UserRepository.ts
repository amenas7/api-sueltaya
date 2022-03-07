export default interface UserRepository {
	_id?: string;
	name: string;
	user_type: string;
	doc_identity?: string;
	email: string;
	password?: string;
	code_verification?: string;
	state?: boolean;
	verify?: boolean;
	age?: number;
	create_at: Date
}
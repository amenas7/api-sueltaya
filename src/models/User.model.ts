import { Schema, SchemaTypes, model } from 'mongoose';

//LLAMADO PRODUCTO PROBLEMAS AL CREAR NUEVA DB
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	user_type: {
		type: String,
		required: true
	},
	doc_identity: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: false
	},
	code_verification: {
		type: String,
		required: false
	},
	state: {
		type: Boolean,
		required: false,
		default: true
	},
	verify: {
		type: Boolean,
		required: false,
		default: false
	},
	age: {
		type: SchemaTypes.Number,
		required: false,
		min: 18,
		max: 128
	},
	provider: {
		type: String,
		required: false
	},
	create_at: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('users', UserSchema);
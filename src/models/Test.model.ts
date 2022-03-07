import { Schema, model } from 'mongoose'; //ORM

const TestSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	courses: [
		{
			type: String
		}
	],
	isTeacher: {
		type: Boolean,
		required: true,
		default: false
	}
});

export default model('test', TestSchema);
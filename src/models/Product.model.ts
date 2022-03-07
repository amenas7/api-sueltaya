import {Schema, SchemaTypes, model, Model } from 'mongoose';
import Product, {Offert, OffertTypes} from "../shared/repository/ProductRepository";

const defaultOffert: Offert = {
	avialable: false,
	type: OffertTypes.NONE
}

const ProductSchema = new Schema<Product, Model<Product>>({
	category: {
		type: SchemaTypes.ObjectId,
		ref: 'categories',
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: SchemaTypes.Number,
		required: true
	},
	images: [{
		type: String,
		required: true
	}],
	ingredients: [{
		type: String,
		required: true
	}],
	offert: {
		type: SchemaTypes.Map,
		required: false,
		default: defaultOffert
	},
	createAt: {
		type: SchemaTypes.Date,
		default: Date.now()
	}
});

export default model('products', ProductSchema);
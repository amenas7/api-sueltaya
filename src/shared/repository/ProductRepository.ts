import { Date, Schema } from 'mongoose';

export default interface Product {
	_id?: string;
	name: string;
	description: string;
	category: Schema.Types.ObjectId; // TODO cambiar por referencia
	ingredients: string[];
	price: number;
	offert?: Offert;
	images: string[];
	createAt: Date;
}

export interface Offert {
	avialable: boolean;
	type: OffertTypes
}
 
export enum OffertTypes { // VALORES PERMITIDOS SOLO SON STRINGS Y NUMEROS
	AMOUNT = "amount",
	PERCENTAGE = "percentage",
	NONE = "none",
}

export enum CreditCard {
	visa = 'visa',
	mastercard = 'master card',
	amex = 'amex',
	dinners = 'dinners club'
}

//const example: OffertTypes = OffertTypes.PERCENTAGE
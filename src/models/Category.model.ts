import { Schema, model, Model } from 'mongoose';
import Category from '../shared/repository/CategoryRepository';
const CategorySchema = new Schema<Category, Model<Category>>({
    name: {
        type: String,
        required: true
    }
});
    
export default model('categories', CategorySchema);
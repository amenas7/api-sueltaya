"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose"); //ORM
const TestSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('test', TestSchema);

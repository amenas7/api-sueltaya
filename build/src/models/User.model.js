"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//LLAMADO PRODUCTO PROBLEMAS AL CREAR NUEVA DB
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        min: 18,
        max: 128
    },
    is_single: {
        type: Boolean,
        required: false,
    },
    courses: {
        type: Object,
        required: false
    },
    create_at: {
        type: mongoose_1.SchemaTypes.Date,
        default: Date.now()
    }
});
exports.default = (0, mongoose_1.model)('users', UserSchema);

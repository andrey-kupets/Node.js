const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { CAR } } = require('../constant');

const carSchema = new Schema({
    model: { type: String, required: true },
    edition: { type: Number, required: true },
    power_hp: { type: Number },
    color: { type: String }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carSchema);

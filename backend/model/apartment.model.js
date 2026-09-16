import { model, Schema } from "mongoose";

const apartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    price_per_night: {
        type: Schema.Types.Decimal128,
        required: true
    },
    amenities: [{
        type: String,
        required: true
    }],
    photos: [{
        type: String,
        required: true
    }],
    is_active: {
        type: Boolean,
        required: true
    }
    
},
{
    timestamps: true
})

export const SApartment = model('Apartment', apartmentSchema);


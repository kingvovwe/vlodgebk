import { model, Schema } from "mongoose"

const bookingSchema = new Schema({
    booking_reference: {
        type: String,
        unique: true,
        required: true,
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Apartment',
        required: true
    },
    guest_name: {
        type: String,
        required: true
    },
    guest_email: {
        type: String,
        required: true
    },
    guest_phone: {
        type: String,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    total_amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending'
    },
    payment_reference: {
        type: String
    }
},
{
    timestamps: true
})

export const SBooking = model('Booking', bookingSchema);


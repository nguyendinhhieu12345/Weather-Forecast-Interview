import mongoose, { Schema, Document, Model } from 'mongoose';

interface IEmailSubscription extends Document {
    email: string;
    confirmed: boolean;
    confirmationCode: string;
}

const emailSubscriptionSchema: Schema<IEmailSubscription> = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        confirmed: {
            type: Boolean,
            required: true,
        },
        confirmationCode: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

const EmailSubscription: Model<IEmailSubscription> = mongoose.model<IEmailSubscription>('EmailSubscription', emailSubscriptionSchema);

export default EmailSubscription;

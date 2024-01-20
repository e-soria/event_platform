import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    imageURL: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string };
    organizer: { _id: string, firstName: string, lastName: string };
    createdAt: Date;
}

const EventSchema = new Schema({

    title:          { type: String, required: true },
    description:    { type: String, required: true },
    location:       { type: String, required: true },
    imageURL:       { type: String, required: true },
    startDateTime:  { type: Date, default: Date.now },
    endDateTime:    { type: Date, default: Date.now },
    price:          { type: String },
    isFree:         { type: Boolean, default: false },
    url:            { type: String },
    category:       { type: Schema.Types.ObjectId, ref: 'Category'},
    organizer:      { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt:      { type: Date, default: Date.now },

})

const Event = models.Event || model('Event', EventSchema);

export default Event
import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  from_name: string;
  user_email: string;
  from_contact: string;
  message: string;
  status: 'new' | 'pending' | 'in-progress' | 'replied' | 'resolved' | 'closed';
  adminResponse?: string;
  adminName?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    from_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    from_contact: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'in-progress', 'replied', 'resolved', 'closed'],
      default: 'new',
    },
    adminResponse: {
      type: String,
      default: null,
    },
    adminName: {
      type: String,
      default: null,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

import mongoose, { Document, Schema } from 'mongoose';

// Newsletter Subscriber Schema
export interface INewsletterSubscriber extends Document {
  email: string;
  name?: string;
  phone?: string;
  isSubscribed: boolean;
  subscriptionDate: Date;
  unsubscriptionDate?: Date;
  source?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    subscriptionDate: {
      type: Date,
      default: Date.now,
    },
    unsubscriptionDate: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      enum: ['website', 'form', 'manual', 'imported'],
      default: 'website',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Newsletter Content Schema
export interface INewsletter extends Document {
  title: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  author: string;
  recipients?: string[];
  recipientCount?: number;
  sentAt?: Date;
  scheduledFor?: Date;
  openRate?: number;
  clickRate?: number;
  bounceRate?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    title: {
      type: String,
      required: [true, 'Newsletter title is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Email subject is required'],
      trim: true,
    },
    htmlContent: {
      type: String,
      required: [true, 'Newsletter content is required'],
    },
    textContent: {
      type: String,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'sent', 'paused'],
      default: 'draft',
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    recipients: {
      type: [String],
      default: [],
    },
    recipientCount: {
      type: Number,
      default: 0,
    },
    sentAt: {
      type: Date,
      default: null,
    },
    scheduledFor: {
      type: Date,
      default: null,
    },
    openRate: {
      type: Number,
      default: 0,
    },
    clickRate: {
      type: Number,
      default: 0,
    },
    bounceRate: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Create unique index on email if it doesn't exist
NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });

// Models
const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);

const Newsletter =
  mongoose.models.Newsletter ||
  mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export { NewsletterSubscriber, Newsletter };

import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    from_name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    user_email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    from_contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    service_type: {
      type: String,
      required: [true, "Service type is required"],
      enum: [
        "Web Development",
        "Mobile App Development",
        "Custom Software Development",
        "Cloud Solutions",
        "Business Analysis",
        "IT Consulting",
        "UI/UX Design",
        "Training & Workshop",
        "System Integration",
        "Other IT Services",
      ],
    },
    project_description: {
      type: String,
      required: [true, "Project description is required"],
    },
    budget_range: {
      type: String,
      required: [true, "Budget range is required"],
      enum: [
        "Below ₦500,000",
        "₦500,000 - ₦1,000,000",
        "₦1,000,000 - ₦5,000,000",
        "₦5,000,000 - ₦10,000,000",
        "₦10,000,000+",
      ],
    },
    timeline: {
      type: String,
      required: [true, "Timeline is required"],
      enum: [
        "Urgent (1-2 weeks)",
        "Short-term (1-3 months)",
        "Medium-term (3-6 months)",
        "Long-term (6+ months)",
      ],
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "in-progress", "quoted", "completed"],
      default: "new",
    },
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

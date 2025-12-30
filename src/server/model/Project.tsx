import mongoose from "mongoose";

interface IProject {
  title: string;
  description: string;
  shortDescription?: string;
  projectLink?: string;
  logoImage?: {
    url: string;
    publicId: string;
  };
  thumbnailImage?: {
    url: string;
    publicId: string;
  };
  slides: Array<{
    url: string;
    publicId: string;
  }>;
  category?: string;
  status: "active" | "inactive" | "draft";
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    projectLink: {
      type: String,
      trim: true,
      default: "",
    },
    logoImage: {
      url: {
        type: String,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      },
    },
    thumbnailImage: {
      url: {
        type: String,
        trim: true,
      },
      publicId: {
        type: String,
        trim: true,
      },
    },
    slides: [
      {
        url: {
          type: String,
          required: [true, "Slide URL is required"],
          trim: true,
        },
        publicId: {
          type: String,
          trim: true,
        },
      },
    ],
    category: {
      type: String,
      trim: true,
      default: "Other",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

// Compound index for title and status
projectSchema.index({ title: 1, status: 1 });

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

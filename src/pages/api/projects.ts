import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/server/db/connect.js";

// Configure API route to handle larger payloads (images as base64)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Allow up to 50MB for image uploads
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Prevent timeout
  res.setHeader("Connection", "keep-alive");

  try {
    // Connect to database
    await connectDB();

    // Dynamically import Project model
    let Project;
    try {
      Project = (await import("@/server/model/Project")).default;
    } catch (importError) {
      console.error("Failed to import Project model:", importError);
      return res.status(500).json({
        success: false,
        message: "Failed to load project model",
      });
    }

    // GET request - Fetch projects
    if (req.method === "GET") {
      try {
        const { status, category, limit = "100", page = "1" } = req.query;

        const limitNum = parseInt(limit as string) || 100;
        const pageNum = parseInt(page as string) || 1;
        const skip = (pageNum - 1) * limitNum;

        const filter: any = {};
        if (status) filter.status = status;
        if (category) filter.category = category;

        const projects = await Project.find(filter)
          .sort({ createdAt: -1 })
          .limit(limitNum)
          .skip(skip);

        const total = await Project.countDocuments(filter);

        return res.status(200).json({
          success: true,
          data: {
            projects,
            pagination: {
              total,
              page: pageNum,
              limit: limitNum,
              pages: Math.ceil(total / limitNum),
            },
          },
        });
      } catch (error: any) {
        console.error("Error in GET /api/projects:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to fetch projects",
        });
      }
    }

    // POST request - Create new project
    if (req.method === "POST") {
      try {
        const {
          title,
          description,
          shortDescription,
          projectLink,
          logoImage,
          thumbnailImage,
          slides,
          category,
          status,
        } = req.body;

        // Validate required fields
        if (!title || !title.trim()) {
          return res.status(400).json({
            success: false,
            message: "Project title is required",
          });
        }

        if (!description || !description.trim()) {
          return res.status(400).json({
            success: false,
            message: "Project description is required",
          });
        }

        if (!slides || !Array.isArray(slides) || slides.length === 0) {
          return res.status(400).json({
            success: false,
            message: "At least one slide is required",
          });
        }

        // Check if project with same title already exists
        const existingProject = await Project.findOne({ title: title.trim() });
        if (existingProject) {
          return res.status(409).json({
            success: false,
            message: "Project with this title already exists",
          });
        }

        // Create new project
        const newProject = new Project({
          title: title.trim(),
          description: description.trim(),
          shortDescription: shortDescription?.trim() || "",
          projectLink: projectLink?.trim() || "",
          logoImage: logoImage || null,
          thumbnailImage: thumbnailImage || null,
          slides: Array.isArray(slides) ? slides : [],
          category: category?.trim() || "Other",
          status: status || "draft",
        });

        // Save project
        const savedProject = await newProject.save();

        return res.status(201).json({
          success: true,
          message: "Project created successfully",
          data: { project: savedProject },
        });
      } catch (error: any) {
        console.error("Error in POST /api/projects:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to create project",
        });
      }
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error: any) {
    console.error("Error in projects API handler:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

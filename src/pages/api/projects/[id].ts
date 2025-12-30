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
  res.setHeader("Connection", "keep-alive");

  try {
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

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    // GET - Fetch single project
    if (req.method === "GET") {
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: "Project not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: { project },
        });
      } catch (error: any) {
        console.error("Error in GET /api/projects/[id]:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to fetch project",
        });
      }
    }

    // PUT - Update project
    if (req.method === "PUT") {
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

        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: "Project not found",
          });
        }

        // Check if title is being changed to a duplicate
        if (title && title.trim() !== project.title) {
          const existingProject = await Project.findOne({
            title: title.trim(),
          });
          if (existingProject) {
            return res.status(409).json({
              success: false,
              message: "Project with this title already exists",
            });
          }
        }

        // Update fields
        if (title) project.title = title.trim();
        if (description) project.description = description.trim();
        if (shortDescription !== undefined)
          project.shortDescription = shortDescription?.trim() || "";
        if (projectLink !== undefined)
          project.projectLink = projectLink?.trim() || "";
        if (logoImage) project.logoImage = logoImage;
        if (thumbnailImage) project.thumbnailImage = thumbnailImage;
        if (slides && Array.isArray(slides) && slides.length > 0)
          project.slides = slides;
        if (category) project.category = category.trim();
        if (status) project.status = status;

        const updatedProject = await project.save();

        return res.status(200).json({
          success: true,
          message: "Project updated successfully",
          data: { project: updatedProject },
        });
      } catch (error: any) {
        console.error("Error in PUT /api/projects/[id]:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to update project",
        });
      }
    }

    // DELETE - Delete project
    if (req.method === "DELETE") {
      try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: "Project not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Project deleted successfully",
        });
      } catch (error: any) {
        console.error("Error in DELETE /api/projects/[id]:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Failed to delete project",
        });
      }
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error: any) {
    console.error("Error in project [id] API handler:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

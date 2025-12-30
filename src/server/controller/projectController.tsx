import { NextResponse, NextRequest } from "next/server";
import Project from "../model/Project";
import { connectDB } from "../db/connect.js";

/**
 * GET /api/projects
 * Get all projects or filter by status
 */
export const getAllProjects = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");
    const page = parseInt(searchParams.get("page") || "1");

    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (category) {
      filter.category = category;
    }

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Project.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: {
          projects,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
};

/**
 * GET /api/projects/:id
 * Get a single project by ID
 */
export const getProjectById = async (
  req: NextRequest,
  id: string
): Promise<NextResponse> => {
  try {
    await connectDB();

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { project } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch project" },
      { status: 500 }
    );
  }
};

/**
 * POST /api/projects
 * Create a new project (admin only)
 */
export const createProject = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    await connectDB();

    const body = await req.json();
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
    } = body;

    // Validation
    if (!title || !description || !slides || slides.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and at least one slide are required",
        },
        { status: 400 }
      );
    }

    // Check if project with same title already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return NextResponse.json(
        { success: false, message: "Project with this title already exists" },
        { status: 409 }
      );
    }

    const newProject = new Project({
      title,
      description,
      shortDescription: shortDescription || "",
      projectLink: projectLink || "",
      logoImage: logoImage || null,
      thumbnailImage: thumbnailImage || null,
      slides,
      category: category || "Other",
      status: status || "draft",
    });

    await newProject.save();

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: { project: newProject },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
};

/**
 * PUT /api/projects/:id
 * Update a project (admin only)
 */
export const updateProject = async (
  req: NextRequest,
  id: string
): Promise<NextResponse> => {
  try {
    await connectDB();

    const body = await req.json();
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
    } = body;

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // If title is being changed, check if new title already exists
    if (title && title !== project.title) {
      const existingProject = await Project.findOne({ title });
      if (existingProject) {
        return NextResponse.json(
          {
            success: false,
            message: "Project with this title already exists",
          },
          { status: 409 }
        );
      }
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (shortDescription !== undefined) project.shortDescription = shortDescription;
    if (projectLink !== undefined) project.projectLink = projectLink;
    if (logoImage) project.logoImage = logoImage;
    if (thumbnailImage) project.thumbnailImage = thumbnailImage;
    if (slides && slides.length > 0) project.slides = slides;
    if (category) project.category = category;
    if (status) project.status = status;

    await project.save();

    return NextResponse.json(
      {
        success: true,
        message: "Project updated successfully",
        data: { project },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
};

/**
 * DELETE /api/projects/:id
 * Delete a project (admin only)
 */
export const deleteProject = async (
  req: NextRequest,
  id: string
): Promise<NextResponse> => {
  try {
    await connectDB();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
};

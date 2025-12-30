import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Quote from "../model/Quote";
import { connectDB } from "../db/connect.js";
import { sendEmailViaBrevo } from "../utils/brevoEmailService";

/**
 * Send quote request submission - Sends email to both user and admin
 * @route POST /api/quote-request
 * @param {NextRequest | NextApiRequest} req - Request object
 * @returns {Promise<NextResponse | void>} Success or error response
 */
export const submitQuoteRequest = async (
  req: NextRequest | NextApiRequest,
  res?: NextApiResponse
): Promise<NextResponse | void> => {
  try {
    await connectDB();

    let body: any;
    if (req instanceof NextRequest) {
      body = await req.json();
    } else {
      body = req.body || {};
    }
    const {
      from_name,
      user_email,
      from_contact,
      company_name,
      service_type,
      project_description,
      budget_range,
      timeline,
    } = body as {
      from_name: string;
      user_email: string;
      from_contact: string;
      company_name: string;
      service_type: string;
      project_description: string;
      budget_range: string;
      timeline: string;
    };

    // Validation
    if (
      !from_name ||
      !user_email ||
      !from_contact ||
      !company_name ||
      !service_type ||
      !project_description ||
      !budget_range ||
      !timeline
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create quote request in database
    const quote = new Quote({
      from_name,
      user_email,
      from_contact,
      company_name,
      service_type,
      project_description,
      budget_range,
      timeline,
      status: "new",
    });

    await quote.save();

    // Prepare email data
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0066cc;">Quote Request Confirmation</h2>
        <p>Dear <strong>${from_name}</strong>,</p>
        
        <p>Thank you for submitting your quote request. We have received your inquiry and our team will review it shortly.</p>
        
        <h3 style="color: #0066cc; margin-top: 20px;">Request Details:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service Type:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${service_type}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget Range:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${budget_range}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${timeline}</td>
          </tr>
        </table>
        
        <h3 style="color: #0066cc; margin-top: 20px;">Project Description:</h3>
        <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #0066cc;">
          ${project_description.replace(/\n/g, "<br>")}
        </p>
        
        <p style="margin-top: 20px;">
          Our team will contact you at <strong>${from_contact}</strong> within 24-48 hours with a personalized quote and proposal.
        </p>
        
        <p style="color: #666; margin-top: 30px;">
          If you have any urgent questions, feel free to reach out to us directly.
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">
          This is an automated confirmation email. Please do not reply to this email.
        </p>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0066cc;">🎯 New Quote Request Submitted</h2>
        
        <h3 style="color: #0066cc; margin-top: 20px;">Client Information:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${from_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${user_email}">${user_email}</a></td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${from_contact}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company_name}</td>
          </tr>
        </table>
        
        <h3 style="color: #0066cc; margin-top: 20px;">Project Requirements:</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service Type:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${service_type}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget Range:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${budget_range}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${timeline}</td>
          </tr>
        </table>
        
        <h3 style="color: #0066cc; margin-top: 20px;">Project Description:</h3>
        <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #0066cc;">
          ${project_description.replace(/\n/g, "<br>")}
        </p>
        
        <p style="margin-top: 20px; padding: 10px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
          <strong>⏰ Action Required:</strong> Please review this request and send a personalized quote to the client.
        </p>
      </div>
    `;

    // Send email to user
    console.log("📧 Sending confirmation email to user...");
    await sendEmailViaBrevo({
      to: user_email,
      subject: "Quote Request Received - Thank You!",
      htmlContent: userEmailHtml,
      textContent: `Quote Request Confirmation. Dear ${from_name}, thank you for submitting your quote request.`,
      tags: ["quote-request", "confirmation", "client"],
    });

    // Send email to admin
    const adminEmail = process.env.BREVO_SENDER_EMAIL || "admin@example.com";
    console.log("📧 Sending notification email to admin...");
    await sendEmailViaBrevo({
      to: adminEmail,
      subject: `New Quote Request - ${service_type} from ${company_name}`,
      htmlContent: adminEmailHtml,
      textContent: `New quote request from ${from_name} at ${company_name} for ${service_type}`,
      tags: ["quote-request", "admin-notification", "new"],
    });

    console.log("✅ Quote request saved and emails sent successfully");

    if (res) {
      // Pages Router - NextApiResponse
      return res.status(201).json({
        success: true,
        message: "Quote request submitted successfully. Check your email for confirmation.",
        quoteId: quote._id,
      });
    }
    // App Router - NextResponse
    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully. Check your email for confirmation.",
        quoteId: quote._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error submitting quote request:", error);
    if (res) {
      // Pages Router
      return res.status(500).json({
        success: false,
        message: errorMessage || "Error submitting quote request",
      });
    }
    // App Router
    return NextResponse.json(
      {
        success: false,
        message: errorMessage || "Error submitting quote request",
      },
      { status: 500 }
    );
  }
};

/**
 * Get all quote requests (admin only)
 * @route GET /api/quote-request
 * @param {NextRequest | NextApiRequest} req - Request object
 * @returns {Promise<NextResponse | void>} List of quotes
 */
export const getQuoteRequests = async (
  req: NextRequest | NextApiRequest,
  res?: NextApiResponse
): Promise<NextResponse | void> => {
  try {
    await connectDB();

    const quotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(50);

    if (res) {
      // Pages Router
      return res.status(200).json({
        success: true,
        count: quotes.length,
        data: quotes,
      });
    }
    // App Router
    return NextResponse.json(
      {
        success: true,
        count: quotes.length,
        data: quotes,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error fetching quote requests:", error);
    if (res) {
      // Pages Router
      return res.status(500).json({
        success: false,
        message: "Error fetching quote requests",
      });
    }
    // App Router
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching quote requests",
      },
      { status: 500 }
    );
  }
};

/**
 * Get single quote request by ID
 * @route GET /api/quote-request/[id]
 * @param {string} id - Quote ID
 * @param {NextRequest | NextApiRequest} req - Request object
 * @returns {Promise<NextResponse | void>} Quote details
 */
export const getQuoteById = async (
  id: string,
  req?: NextRequest | NextApiRequest,
  res?: NextApiResponse
): Promise<NextResponse | void> => {
  try {
    await connectDB();

    const quote = await Quote.findById(id);

    if (!quote) {
      if (res) {
        return res.status(404).json({ success: false, message: "Quote not found" });
      }
      return NextResponse.json(
        { success: false, message: "Quote not found" },
        { status: 404 }
      );
    }

    if (res) {
      return res.status(200).json({ success: true, data: quote });
    }
    return NextResponse.json(
      { success: true, data: quote },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error fetching quote:", error);
    if (res) {
      return res.status(500).json({ success: false, message: "Error fetching quote" });
    }
    return NextResponse.json(
      { success: false, message: "Error fetching quote" },
      { status: 500 }
    );
  }
};

/**
 * Update quote status (admin only)
 * @route PUT /api/quote-request/[id]
 * @param {string} id - Quote ID
 * @param {NextRequest | NextApiRequest} req - Request object
 * @returns {Promise<NextResponse | void>} Updated quote
 */
export const updateQuote = async (
  id: string,
  req: NextRequest | NextApiRequest,
  res?: NextApiResponse
): Promise<NextResponse | void> => {
  try {
    await connectDB();

    let body: any;
    if (req instanceof NextRequest) {
      body = await req.json();
    } else {
      body = req.body || {};
    }
    const { status, notes } = body as {
      status: string;
      notes?: string;
    };

    if (!status) {
      if (res) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      );
    }

    const quote = await Quote.findByIdAndUpdate(
      id,
      { status, notes, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!quote) {
      if (res) {
        return res.status(404).json({ success: false, message: "Quote not found" });
      }
      return NextResponse.json(
        { success: false, message: "Quote not found" },
        { status: 404 }
      );
    }

    // Send status update email to client
    try {
      const { sendEmailViaBrevo } = await import('@/server/utils/brevoEmailService');
      
      const statusMessages: { [key: string]: string } = {
        'new': 'Your quote request has been received',
        'in-progress': 'We are reviewing your quote request',
        'completed': 'Your quote is ready! Please check your email for details',
        'rejected': 'Your quote request has been reviewed',
      };

      const statusMessage = statusMessages[status] || `Your quote status has been updated to: ${status}`;

      await sendEmailViaBrevo({
        to: quote.user_email,
        subject: `Quote Request Status Update - ${quote.company_name}`,
        htmlContent: `
          <h2>Quote Request Status Update</h2>
          <p>Hi ${quote.from_name},</p>
          <p>${statusMessage}</p>
          <p><strong>Company:</strong> ${quote.company_name}</p>
          <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          <p>Thank you for contacting us!</p>
          <hr />
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
        `,
        tags: ['quote-status-update'],
      });
    } catch (emailError) {
      console.error('Error sending status update email:', emailError);
      // Don't fail the request if email fails, but log the error
    }

    if (res) {
      return res.status(200).json({
        success: true,
        message: "Quote updated successfully",
        data: quote,
      });
    }
    return NextResponse.json(
      { success: true, message: "Quote updated successfully", data: quote },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error updating quote:", error);
    if (res) {
      return res.status(500).json({ success: false, message: "Error updating quote" });
    }
    return NextResponse.json(
      { success: false, message: "Error updating quote" },
      { status: 500 }
    );
  }
};

/**
 * Delete quote request (admin only)
 * @route DELETE /api/quote-request/[id]
 * @param {string} id - Quote ID
 * @returns {Promise<NextResponse | void>} Success message
 */
export const deleteQuote = async (
  id: string,
  req?: NextRequest | NextApiRequest,
  res?: NextApiResponse
): Promise<NextResponse | void> => {
  try {
    await connectDB();

    const quote = await Quote.findByIdAndDelete(id);

    if (!quote) {
      if (res) {
        return res.status(404).json({ success: false, message: "Quote not found" });
      }
      return NextResponse.json(
        { success: false, message: "Quote not found" },
        { status: 404 }
      );
    }

    if (res) {
      return res.status(200).json({ success: true, message: "Quote deleted successfully" });
    }
    return NextResponse.json(
      { success: true, message: "Quote deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Error deleting quote:", error);
    if (res) {
      return res.status(500).json({ success: false, message: "Error deleting quote" });
    }
    return NextResponse.json(
      { success: false, message: "Error deleting quote" },
      { status: 500 }
    );
  }
};

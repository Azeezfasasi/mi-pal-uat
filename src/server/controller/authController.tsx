import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../model/User";
import { connectDB } from "../db/connect";
import { sendEmailViaBrevo } from "../utils/brevoEmailService";
import {
  verificationEmailTemplate,
  passwordResetEmailTemplate,
  welcomeEmailTemplate,
} from "../utils/emailTemplates";

// JWT Secret
const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || "7d";

// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE } as jwt.SignOptions
  );
};

// 1. REGISTER - Create new user account
export const register = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isEmailVerified: false,
    });

    await user.save();

    // Generate email verification token
    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    const emailTemplate = verificationEmailTemplate(
      `${firstName} ${lastName}`,
      verificationLink
    );

    try {
      console.log("📧 Attempting to send verification email to:", email);
      const emailResult = await sendEmailViaBrevo({
        to: email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html,
        textContent: emailTemplate.text,
      });
      
      if (!emailResult.success) {
        console.error("❌ Email sending failed:", emailResult.error, emailResult.details);
      } else {
        console.log("✅ Verification email sent successfully");
      }
    } catch (mailError) {
      console.error("❌ Error sending email:", (mailError as Error).message);
    }

    // Generate token
    const token = generateToken(user._id.toString());

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please check your email to verify.",
        token,
        user: user.getPublicProfile(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

// 2. LOGIN - Authenticate user
export const login = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.isAccountLocked()) {
      return NextResponse.json(
        {
          success: false,
          message: "Account locked. Try again later.",
        },
        { status: 423 }
      );
    }

    // Check if account is active
    if (!user.isActive || user.accountStatus !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Account is disabled or suspended",
        },
        { status: 403 }
      );
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      await user.incrementLoginAttempts();
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: user.getPublicProfile(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

// 3. FORGOT PASSWORD - Send password reset email
export const forgotPassword = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = user.getPasswordResetToken();
    await (user as any).save({ validateBeforeSave: false });

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const emailTemplate = passwordResetEmailTemplate(
      `${user.firstName} ${user.lastName}`,
      resetLink
    );

    try {
      console.log("📧 Attempting to send password reset email to:", email);
      const emailResult = await sendEmailViaBrevo({
        to: email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html,
        textContent: emailTemplate.text,
      });
      
      if (!emailResult.success) {
        console.error("❌ Email sending failed:", emailResult.error, emailResult.details);
      } else {
        console.log("✅ Password reset email sent successfully");
      }
    } catch (mailError) {
      console.error("❌ Error sending email:", (mailError as Error).message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Password reset email sent. Check your inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send reset email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

// 4. RESET PASSWORD - Update password with reset token
export const resetPassword = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { token, password, confirmPassword } = body;

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Hash the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    // Generate new token
    const newToken = generateToken(user._id.toString());

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successful",
        token: newToken,
        user: user.getPublicProfile(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Password reset failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

// 5. VERIFY EMAIL - Confirm email address
export const verifyEmail = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required" },
        { status: 400 }
      );
    }

    // Hash the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Email verification failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

// 6. LOGOUT - Clear session/logout
export const logout = async (req: NextRequest) => {
  try {
    return NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

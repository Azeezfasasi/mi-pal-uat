import { NextApiRequest, NextApiResponse } from "next";
import { requireRole } from "@/server/middleware/authMiddleware";
import {
  getQuoteById,
  updateQuote,
  deleteQuote,
} from "@/server/controller/quoteController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Require admin or manager role for all operations
    if (!(await requireRole(req, res, ['admin', 'manager']))) return;

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid quote ID" });
    }

    if (req.method === "GET") {
      return await getQuoteById(id, req, res);
    } else if (req.method === "PUT") {
      return await updateQuote(id, req, res);
    } else if (req.method === "DELETE") {
      return await deleteQuote(id, req, res);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

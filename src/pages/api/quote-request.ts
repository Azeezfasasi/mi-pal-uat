import { NextApiRequest, NextApiResponse } from "next";
import {
  submitQuoteRequest,
  getQuoteRequests,
} from "@/server/controller/quoteController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      return await submitQuoteRequest(req, res);
    } else if (req.method === "GET") {
      return await getQuoteRequests(req, res);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

import { sendSuccessResponse } from "../../../lib/auth.js";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // Since we're using JWT tokens, logout is handled client-side
    // The client will remove the token from localStorage
    // In a production app with refresh tokens, you might want to
    // blacklist the token here

    sendSuccessResponse(res, null, "Logged out successfully");
}

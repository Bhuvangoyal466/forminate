import { submitFormResponse } from "../../../../lib/dummyData";

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === "POST") {
        // Submit form response
        try {
            const responseData = req.body;
            const response = submitFormResponse(id, responseData);
            res.status(201).json({
                success: true,
                message: "Response submitted successfully",
                response,
            });
        } catch (error) {
            res.status(400).json({ error: "Failed to submit response" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // In a real app, you'd invalidate the token in your database
    // For now, we'll just return a success response
    // The client will handle clearing localStorage

    res.status(200).json({
        message: "Logout successful",
    });
}

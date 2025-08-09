import { getFormById, updateForm } from "../../../lib/dummyData";

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        // Get form by ID
        const form = getFormById(id);
        if (!form) {
            return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json(form);
    } else if (req.method === "PUT") {
        // Update form
        try {
            const formData = req.body;
            const updatedForm = updateForm(id, formData);
            if (!updatedForm) {
                return res.status(404).json({ error: "Form not found" });
            }
            res.status(200).json(updatedForm);
        } catch (error) {
            res.status(400).json({ error: "Failed to update form" });
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

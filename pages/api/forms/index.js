import { getForms, createForm } from "../../../lib/dummyData";

export default function handler(req, res) {
    if (req.method === "GET") {
        // Get all forms
        const forms = getForms();
        res.status(200).json(forms);
    } else if (req.method === "POST") {
        // Create new form
        try {
            const formData = req.body;
            const newForm = createForm(formData);
            res.status(201).json(newForm);
        } catch (error) {
            res.status(400).json({ error: "Failed to create form" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

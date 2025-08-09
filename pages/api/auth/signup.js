import fs from "fs";
import path from "path";

// Helper function to read users from JSON file
const getUsersFromFile = () => {
    try {
        const filePath = path.join(process.cwd(), "data", "users.json");
        const fileContent = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileContent);
    } catch (error) {
        return { users: [] };
    }
};

// Helper function to write users to JSON file
const writeUsersToFile = (data) => {
    try {
        const filePath = path.join(process.cwd(), "data", "users.json");
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing users file:", error);
        return false;
    }
};

// Helper function to generate a simple token (in production, use JWT)
const generateToken = (user) => {
    return Buffer.from(
        JSON.stringify({
            id: user.id,
            email: user.email,
            timestamp: Date.now(),
        })
    ).toString("base64");
};

// Helper function to generate unique ID
const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: "Please enter a valid email address" });
    }

    try {
        const data = getUsersFromFile();

        // Check if user already exists
        const existingUser = data.users.find((u) => u.email === email);
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "An account with this email already exists" });
        }

        // Create new user
        const newUser = {
            id: generateId(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // In production, hash this password
            plan: "free",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
        };

        // Add user to data
        data.users.push(newUser);

        // Save to file
        const saved = writeUsersToFile(data);
        if (!saved) {
            return res
                .status(500)
                .json({
                    message: "Failed to create account. Please try again.",
                });
        }

        // Generate token
        const token = generateToken(newUser);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: "Account created successfully",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Sign up error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

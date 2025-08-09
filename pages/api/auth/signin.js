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

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    try {
        const data = getUsersFromFile();
        const user = data.users.find((u) => u.email === email);

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // In a real app, you'd hash and compare passwords
        if (user.password !== password) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Update last login
        user.lastLogin = new Date().toISOString();

        // Update user in file
        const userIndex = data.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
            data.users[userIndex] = user;
            writeUsersToFile(data);
        }

        // Generate token
        const token = generateToken(user);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            message: "Sign in successful",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Sign in error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

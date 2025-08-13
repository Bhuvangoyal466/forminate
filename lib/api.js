// API client for Forminate
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        if (config.body && typeof config.body === "object") {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error:
                        data.message ||
                        data.error ||
                        `HTTP error! status: ${response.status}`,
                    status: response.status,
                };
            }

            return {
                success: true,
                data: data.data || data,
                message: data.message,
            };
        } catch (error) {
            console.error("API request failed:", error);
            return {
                success: false,
                error: error.message || "Network error occurred",
                status: 0,
            };
        }
    }

    // Auth methods
    async signIn(email, password) {
        return this.request("/auth/signin", {
            method: "POST",
            body: { email, password },
        });
    }

    async signUp(name, email, password, plan = "free") {
        return this.request("/auth/signup", {
            method: "POST",
            body: { name, email, password, plan },
        });
    }

    async signOut() {
        return this.request("/auth/logout", {
            method: "POST",
        });
    }

    // Form methods
    async getForms(page = 1, limit = 10) {
        return this.request(`/forms?page=${page}&limit=${limit}`);
    }

    async getForm(id) {
        return this.request(`/forms/${id}`);
    }

    async createForm(formData) {
        return this.request("/forms", {
            method: "POST",
            body: formData,
        });
    }

    async updateForm(id, formData) {
        return this.request(`/forms/${id}`, {
            method: "PUT",
            body: formData,
        });
    }

    async deleteForm(id) {
        return this.request(`/forms/${id}`, {
            method: "DELETE",
        });
    }

    // Publish/Unpublish methods
    async publishForm(id) {
        return this.updateForm(id, { status: "published" });
    }

    async unpublishForm(id) {
        return this.updateForm(id, { status: "draft" });
    }

    // Public form methods
    async getPublicForm(slug) {
        return this.request(`/f/${slug}`);
    }

    // Preview form method (for authenticated users)
    async getFormForPreview(id) {
        return this.request(`/forms/${id}/preview`);
    }

    async submitForm(formId, submissionData) {
        return this.request(`/forms/${formId}/submit`, {
            method: "POST",
            body: submissionData,
        });
    }

    // Submission methods
    async getFormSubmissions(formId, page = 1, limit = 10) {
        return this.request(
            `/forms/${formId}/submissions?page=${page}&limit=${limit}`
        );
    }

    async getFormAnalytics(formId) {
        return this.request(`/forms/${formId}/analytics`);
    }
}

// Create a singleton instance
const apiClient = new ApiClient();

// Load token from localStorage on client side
if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
        apiClient.setToken(token);
    }
}

export default apiClient;

// Legacy API functions for backward compatibility
export const fetchFormById = async (id) => {
    try {
        const response = await apiClient.getPublicForm(id);
        return response.data;
    } catch (error) {
        console.error("Error fetching form:", error);
        throw error;
    }
};

export const fetchFormForPreview = async (id) => {
    try {
        const response = await apiClient.getFormForPreview(id);
        return response.data;
    } catch (error) {
        console.error("Error fetching form for preview:", error);
        throw error;
    }
};

export const submitFormResponse = async (formId, responseData) => {
    try {
        const response = await apiClient.submitForm(formId, responseData);
        return response.data;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};

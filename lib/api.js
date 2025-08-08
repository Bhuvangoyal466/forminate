// Mock API functions for Forminate
// These will be replaced with actual API calls later

export const fetchFormById = async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Promise.resolve({
        id: id,
        title: "Sample Customer Feedback Form",
        description: "We'd love to hear your thoughts about our product",
        headerImage: "/api/placeholder/800/300",
        questions: [
            {
                id: "1",
                type: "categorize",
                title: "Which category best describes your role?",
                subtitle: "This helps us understand our audience better",
                image: "/api/placeholder/400/200",
                options: [
                    "Developer",
                    "Designer",
                    "Product Manager",
                    "Marketing",
                    "Other",
                ],
                required: true,
            },
            {
                id: "2",
                type: "cloze",
                title: "Complete this sentence: 'The best thing about our product is ___'",
                subtitle: "Feel free to be as detailed as you'd like",
                placeholder: "Type your answer here...",
                required: true,
            },
            {
                id: "3",
                type: "comprehension",
                title: "How would you rate your overall experience?",
                subtitle: "Please select a rating from 1 to 5",
                image: "/api/placeholder/300/150",
                options: [
                    { value: 1, label: "Poor" },
                    { value: 2, label: "Fair" },
                    { value: 3, label: "Good" },
                    { value: 4, label: "Very Good" },
                    { value: 5, label: "Excellent" },
                ],
                required: true,
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
};

export const saveForm = async (formData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return Promise.resolve({
        id: formData.id || Math.random().toString(36).substr(2, 9),
        ...formData,
        updatedAt: new Date().toISOString(),
    });
};

export const submitFormResponse = async (formId, responses) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    return Promise.resolve({
        id: Math.random().toString(36).substr(2, 9),
        formId,
        responses,
        submittedAt: new Date().toISOString(),
    });
};

export const fetchFormResponses = async (formId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return Promise.resolve([
        {
            id: "resp_1",
            formId,
            responses: {
                1: "Developer",
                2: "the intuitive user interface and powerful features",
                3: 5,
            },
            submittedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: "resp_2",
            formId,
            responses: {
                1: "Designer",
                2: "how easy it is to create beautiful forms",
                3: 4,
            },
            submittedAt: new Date(Date.now() - 43200000).toISOString(),
        },
        {
            id: "resp_3",
            formId,
            responses: {
                1: "Product Manager",
                2: "the analytics and insights it provides",
                3: 5,
            },
            submittedAt: new Date(Date.now() - 21600000).toISOString(),
        },
    ]);
};

export const createNewForm = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    return Promise.resolve({
        id: Math.random().toString(36).substr(2, 9),
        title: "Untitled Form",
        description: "",
        headerImage: null,
        questions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
};

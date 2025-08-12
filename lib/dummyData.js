// Dummy data for forms
let forms = [
    {
        id: "1",
        title: "Sample Customer Feedback Form",
        questions: [
            {
                id: "1",
                type: "categorize",
                title: "Categorize these products by type",
                description:
                    "Drag and drop the items into the correct categories",
                image: null,
                options: [
                    "Apple iPhone",
                    "Samsung Galaxy",
                    "Dell Laptop",
                    "MacBook Pro",
                ],
                categories: ["Phones", "Computers"],
            },
            {
                id: "2",
                type: "cloze",
                title: "Complete the sentence",
                description: "Fill in the blanks with appropriate words",
                image: null,
                text: "The quick ___ fox jumps over the ___ dog.",
                blanks: ["brown", "lazy"],
            },
            {
                id: "3",
                type: "comprehension",
                title: "Reading Comprehension",
                description: "Read the passage and answer the questions",
                image: null,
                passage:
                    "Climate change is one of the most pressing issues of our time. Scientists have observed rising global temperatures, melting ice caps, and changing weather patterns.",
                questions: [
                    {
                        id: "3-1",
                        question:
                            "What is one of the most pressing issues mentioned?",
                        type: "multiple-choice",
                        options: [
                            "Pollution",
                            "Climate change",
                            "Deforestation",
                            "Overpopulation",
                        ],
                    },
                    {
                        id: "3-2",
                        question: "What have scientists observed?",
                        type: "multiple-choice",
                        options: [
                            "Rising temperatures only",
                            "Melting ice caps only",
                            "Rising temperatures, melting ice caps, and changing weather patterns",
                            "None of the above",
                        ],
                    },
                ],
            },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

let responses = [];

export const getForms = () => forms;

export const getFormById = (id) => forms.find((form) => form.id === id);

export const createForm = (formData) => {
    const newForm = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    forms.push(newForm);
    return newForm;
};

export const updateForm = (id, formData) => {
    const index = forms.findIndex((form) => form.id === id);
    if (index !== -1) {
        forms[index] = {
            ...forms[index],
            ...formData,
            updatedAt: new Date().toISOString(),
        };
        return forms[index];
    }
    return null;
};

export const submitFormResponse = (formId, responseData) => {
    const response = {
        id: Date.now().toString(),
        formId,
        responses: responseData,
        submittedAt: new Date().toISOString(),
    };
    responses.push(response);
    return response;
};

export const getResponses = () => responses;

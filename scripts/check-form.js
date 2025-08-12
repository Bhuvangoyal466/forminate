// Quick script to check form status and publish if needed
// Run this with: node scripts/check-form.js <form-id>

const { FormModel } = require("../lib/models.js");

async function checkAndPublishForm(formId) {
    try {
        console.log(`Checking form: ${formId}`);
        
        // Try to find the form
        const form = await FormModel.findById(formId);
        
        if (!form) {
            console.log("❌ Form not found");
            return;
        }
        
        console.log(`✅ Form found: "${form.title}"`);
        console.log(`📄 Status: ${form.status}`);
        console.log(`🔗 Slug: ${form.slug}`);
        console.log(`🌐 Public: ${form.settings?.isPublic}`);
        console.log(`👤 User ID: ${form.userId}`);
        
        if (form.status !== "published") {
            console.log("\n🚀 Form is not published. Publishing now...");
            
            const updateResult = await FormModel.update(
                formId,
                { status: "published" },
                form.userId.toString()
            );
            
            if (updateResult.modifiedCount > 0) {
                console.log("✅ Form published successfully!");
                console.log(`🔗 Public URL: /api/f/${form.slug}`);
                console.log(`🔗 Preview URL: /preview/${formId}`);
            } else {
                console.log("❌ Failed to publish form");
            }
        } else {
            console.log("✅ Form is already published");
            console.log(`🔗 Public URL: /api/f/${form.slug}`);
            console.log(`🔗 Preview URL: /preview/${formId}`);
        }
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// Get form ID from command line arguments
const formId = process.argv[2];

if (!formId) {
    console.log("Usage: node scripts/check-form.js <form-id>");
    console.log("Example: node scripts/check-form.js 689b0eca26b87b93d890e4b0");
    process.exit(1);
}

checkAndPublishForm(formId);

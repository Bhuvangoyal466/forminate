# MongoDB Database Schema for Forminate

## Database: `forminate`

### Collections Overview:

1. **users** - User accounts and authentication
2. **forms** - Form definitions and metadata
3. **form_submissions** - Individual form responses
4. **form_analytics** - Analytics and statistics
5. **sessions** - User sessions (optional, can use JWT instead)

---

## Collection Schemas:

### 1. users
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  plan: String (enum: ['free', 'pro', 'enterprise'], default: 'free'),
  profileImage: String (optional),
  emailVerified: Boolean (default: false),
  emailVerificationToken: String (optional),
  passwordResetToken: String (optional),
  passwordResetExpiry: Date (optional),
  subscription: {
    plan: String,
    status: String (enum: ['active', 'inactive', 'cancelled']),
    startDate: Date,
    endDate: Date,
    stripeCustomerId: String (optional),
    stripeSubscriptionId: String (optional)
  },
  preferences: {
    theme: String (enum: ['light', 'dark'], default: 'light'),
    notifications: {
      email: Boolean (default: true),
      push: Boolean (default: false)
    }
  },
  limits: {
    maxForms: Number (default based on plan),
    maxSubmissionsPerForm: Number (default based on plan),
    maxFileUploadSize: Number (default based on plan)
  },
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now),
  lastLogin: Date,
  isActive: Boolean (default: true)
}
```

### 2. forms
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  slug: String (unique, required), // For public URLs
  userId: ObjectId (ref: 'users', required), // Form creator
  headerImage: String (optional),
  
  // Form Configuration
  settings: {
    isPublic: Boolean (default: true),
    requireAuth: Boolean (default: false),
    allowMultipleSubmissions: Boolean (default: true),
    collectEmail: Boolean (default: false),
    redirectUrl: String (optional),
    customTheme: {
      primaryColor: String,
      backgroundColor: String,
      fontFamily: String
    },
    notifications: {
      onSubmission: Boolean (default: true),
      emailNotifications: [String] // Email addresses to notify
    }
  },
  
  // Form Structure
  questions: [{
    id: String (required),
    type: String (enum: ['categorize', 'cloze', 'comprehension', 'multiple-choice', 'text', 'email', 'number', 'date', 'file-upload'], required),
    title: String (required),
    subtitle: String,
    placeholder: String,
    image: String,
    options: [String], // For multiple choice, categorize questions
    validation: {
      required: Boolean (default: false),
      minLength: Number,
      maxLength: Number,
      pattern: String, // Regex pattern
      fileTypes: [String], // For file uploads
      maxFileSize: Number // In bytes
    },
    logic: {
      showIf: {
        questionId: String,
        condition: String (enum: ['equals', 'not_equals', 'contains', 'greater_than', 'less_than']),
        value: String
      }
    }
  }],
  
  // Analytics
  analytics: {
    totalViews: Number (default: 0),
    totalSubmissions: Number (default: 0),
    conversionRate: Number (default: 0),
    avgCompletionTime: Number (default: 0) // in seconds
  },
  
  // Status
  status: String (enum: ['draft', 'published', 'paused', 'archived'], default: 'draft'),
  
  // Timestamps
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now),
  publishedAt: Date,
  
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  }
}
```

### 3. form_submissions
```javascript
{
  _id: ObjectId,
  formId: ObjectId (ref: 'forms', required),
  formSlug: String (required), // Denormalized for quick lookup
  
  // Submitter Information
  submitterInfo: {
    email: String,
    ipAddress: String,
    userAgent: String,
    location: {
      country: String,
      city: String,
      timezone: String
    }
  },
  
  // Response Data
  responses: [{
    questionId: String (required),
    questionType: String (required),
    questionTitle: String (required),
    answer: {}, // Flexible field for different answer types
    files: [{ // For file uploads
      filename: String,
      originalName: String,
      size: Number,
      mimeType: String,
      url: String
    }]
  }],
  
  // Metadata
  submissionTime: {
    started: Date,
    completed: Date,
    totalTime: Number // in seconds
  },
  
  // Status
  status: String (enum: ['completed', 'partial', 'flagged'], default: 'completed'),
  isRead: Boolean (default: false),
  notes: String, // Admin notes
  
  // Timestamps
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### 4. form_analytics
```javascript
{
  _id: ObjectId,
  formId: ObjectId (ref: 'forms', required),
  userId: ObjectId (ref: 'users', required),
  
  // Time-based metrics
  date: Date (required), // Daily aggregation
  
  // Metrics
  metrics: {
    views: Number (default: 0),
    uniqueViews: Number (default: 0),
    submissions: Number (default: 0),
    completionRate: Number (default: 0),
    avgCompletionTime: Number (default: 0),
    bounceRate: Number (default: 0),
    
    // Question-level analytics
    questionMetrics: [{
      questionId: String,
      views: Number,
      responses: Number,
      dropoffRate: Number,
      avgResponseTime: Number
    }],
    
    // Traffic sources
    trafficSources: [{
      source: String (enum: ['direct', 'social', 'email', 'referral', 'search']),
      count: Number,
      url: String
    }],
    
    // Device/Browser stats
    devices: [{
      type: String (enum: ['desktop', 'mobile', 'tablet']),
      count: Number
    }],
    
    browsers: [{
      name: String,
      count: Number
    }]
  },
  
  createdAt: Date (default: Date.now)
}
```

### 5. sessions (Optional - if not using JWT)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'users', required),
  sessionToken: String (unique, required),
  expiresAt: Date (required),
  createdAt: Date (default: Date.now),
  lastAccessedAt: Date (default: Date.now),
  ipAddress: String,
  userAgent: String
}
```

---

## Database Indexes:

### users collection:
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ emailVerificationToken: 1 })
db.users.createIndex({ passwordResetToken: 1 })
db.users.createIndex({ createdAt: -1 })
```

### forms collection:
```javascript
db.forms.createIndex({ userId: 1 })
db.forms.createIndex({ slug: 1 }, { unique: true })
db.forms.createIndex({ status: 1 })
db.forms.createIndex({ createdAt: -1 })
db.forms.createIndex({ "analytics.totalSubmissions": -1 })
db.forms.createIndex({ userId: 1, status: 1 })
```

### form_submissions collection:
```javascript
db.form_submissions.createIndex({ formId: 1 })
db.form_submissions.createIndex({ formSlug: 1 })
db.form_submissions.createIndex({ "submitterInfo.email": 1 })
db.form_submissions.createIndex({ createdAt: -1 })
db.form_submissions.createIndex({ formId: 1, createdAt: -1 })
db.form_submissions.createIndex({ formId: 1, status: 1 })
db.form_submissions.createIndex({ formId: 1, isRead: 1 })
```

### form_analytics collection:
```javascript
db.form_analytics.createIndex({ formId: 1, date: -1 })
db.form_analytics.createIndex({ userId: 1, date: -1 })
db.form_analytics.createIndex({ date: -1 })
```

### sessions collection (if used):
```javascript
db.sessions.createIndex({ userId: 1 })
db.sessions.createIndex({ sessionToken: 1 }, { unique: true })
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

## Form URL Structure:

- **Public Form URL**: `https://yourapp.com/f/{slug}`
- **Form Builder URL**: `https://yourapp.com/builder/{formId}`
- **Form Analytics URL**: `https://yourapp.com/dashboard/forms/{formId}/analytics`
- **Form Responses URL**: `https://yourapp.com/dashboard/forms/{formId}/responses`

---

## Key Features Supported:

1. **User Management**: Registration, login, email verification, password reset
2. **Form Creation**: Drag-and-drop builder with multiple question types
3. **Form Sharing**: Public URLs with custom slugs
4. **Response Collection**: Anonymous and authenticated submissions
5. **Analytics**: View counts, completion rates, response analytics
6. **Dashboard**: Form management, response viewing, analytics
7. **File Uploads**: Support for file attachments in forms
8. **Conditional Logic**: Show/hide questions based on previous answers
9. **Custom Themes**: Branded form appearance
10. **Notifications**: Email alerts on form submissions

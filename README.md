# Forminate - Advanced Form Builder

A powerful, modern form builder application built with Next.js, MongoDB, and a beautiful React interface. Create, share, and manage forms with real-time analytics and response tracking.

## 🚀 Features

### Core Features
- **User Authentication**: Secure signup/signin with JWT tokens
- **Form Builder**: Intuitive drag-and-drop interface with multiple question types
- **Public Form Sharing**: Generate shareable links with custom slugs
- **Real-time Analytics**: Track views, submissions, completion rates
- **Response Management**: View and manage form submissions
- **Multi-plan Support**: Free, Pro, and Enterprise plans with different limits

### Question Types
- **Categorize**: Multiple choice with single selection
- **Cloze**: Fill-in-the-blank text responses
- **Comprehension**: Rating scales and multiple choice
- **Text Input**: Short and long text responses
- **Email**: Email validation
- **Number**: Numeric inputs
- **Date**: Date picker
- **File Upload**: File attachments

### Advanced Features
- **Conditional Logic**: Show/hide questions based on responses
- **Custom Themes**: Brand your forms with custom colors
- **Email Notifications**: Get notified of new submissions
- **Rate Limiting**: Prevent spam and abuse
- **File Uploads**: Support for image and document uploads
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with optimized indexes
- **Authentication**: JWT with bcrypt password hashing
- **File Storage**: Local storage with configurable limits
- **Email**: Nodemailer integration

## 📋 Prerequisites

- Node.js 18 or later
- MongoDB 5.0 or later (local or cloud)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd forminate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/forminate

# JWT Secret (Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Initialize Database
```bash
node scripts/init-db.js
```

This will:
- Create necessary MongoDB indexes
- Set up collections
- Create a test user: `test@forminate.com` / `password123`

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📊 Database Schema

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  plan: String (free|pro|enterprise),
  emailVerified: Boolean,
  preferences: Object,
  limits: Object,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

#### Forms
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  slug: String (unique),
  userId: ObjectId,
  settings: Object,
  questions: Array,
  analytics: Object,
  status: String (draft|published|paused|archived),
  createdAt: Date,
  updatedAt: Date
}
```

#### Form Submissions
```javascript
{
  _id: ObjectId,
  formId: ObjectId,
  formSlug: String,
  submitterInfo: Object,
  responses: Array,
  submissionTime: Object,
  status: String,
  isRead: Boolean,
  createdAt: Date
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/logout` - Sign out

### Forms (Protected)
- `GET /api/forms` - Get user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/[id]` - Get specific form
- `PUT /api/forms/[id]` - Update form
- `DELETE /api/forms/[id]` - Delete form

### Public Forms
- `GET /api/f/[slug]` - Get public form by slug
- `POST /api/forms/[id]/submit` - Submit form response

### Analytics & Submissions
- `GET /api/forms/[id]/submissions` - Get form submissions
- `GET /api/forms/[id]/analytics` - Get form analytics

## 🎨 Form URL Structure

- **Form Builder**: `/builder/[formId]`
- **Public Form**: `/f/[slug]`
- **Form Analytics**: `/dashboard/forms/[formId]/analytics`
- **Form Responses**: `/dashboard/forms/[formId]/responses`

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive server-side validation
- **CORS Protection**: Configured for security
- **SQL Injection Prevention**: MongoDB native protection

## 📈 Plan Limits

### Free Plan
- 3 forms maximum
- 100 submissions per form
- 5MB file upload limit

### Pro Plan
- 50 forms maximum
- 5,000 submissions per form
- 25MB file upload limit
- Email notifications
- Custom themes

### Enterprise Plan
- Unlimited forms
- Unlimited submissions
- 100MB file upload limit
- All features included
- Priority support

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB (Atlas recommended for production)
2. Configure environment variables
3. Set up email service (optional)
4. Configure file storage

### Deploy to Vercel
```bash
npm run build
# Deploy to Vercel
```

### Deploy to Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx recommended)

## 🧪 Testing

### Manual Testing
1. Create an account
2. Create a form with different question types
3. Publish the form
4. Fill out the form as an end user
5. Check analytics and responses

### Test User
- Email: `test@forminate.com`
- Password: `password123`

## 📁 Project Structure

```
forminate/
├── components/          # React components
├── contexts/           # React contexts
├── lib/               # Utility libraries
│   ├── mongodb.js     # Database connection
│   ├── models.js      # Database models
│   ├── auth.js        # Authentication utilities
│   └── api.js         # API client
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   ├── auth/          # Auth pages
│   └── dashboard/     # Protected pages
├── public/            # Static assets
├── scripts/           # Setup scripts
├── styles/            # Global styles
└── docs/              # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify MONGODB_URI in environment variables
   - Ensure network connectivity

2. **JWT Token Errors**
   - Check JWT_SECRET configuration
   - Clear browser localStorage
   - Verify token expiration

3. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Check network timeout settings

### Getting Help

- Check the [documentation](./docs/)
- Review [common issues](./docs/troubleshooting.md)
- Open an issue on GitHub

## 🎯 Roadmap

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Form templates marketplace
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] API webhooks
- [ ] Third-party integrations (Zapier, etc.)
- [ ] White-label solutions

---

Made with ❤️ by the Forminate Team

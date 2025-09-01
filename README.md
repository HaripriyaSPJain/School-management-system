# 🏫 School Management System

A modern, responsive web application built with Next.js for managing and exploring schools. This project demonstrates a complete full-stack solution with a beautiful UI and robust functionality.

## ✨ Features

### Frontend
- **Responsive Design**: Works seamlessly on both mobile and desktop devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional appearance
- **Form Validation**: Comprehensive validation using react-hook-form and Yup
- **Image Upload**: Secure file upload with validation and preview
- **Search & Filtering**: Advanced search and filtering capabilities
- **E-commerce Style Layout**: Schools displayed in an attractive grid format

### Backend (Coming Soon)
- **MySQL Database**: Robust data storage with proper relationships
- **API Routes**: RESTful API endpoints for CRUD operations
- **File Upload**: Secure image storage in dedicated folders
- **Data Validation**: Server-side validation and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### 1. Home Page (`/`)
- Landing page with project overview
- Navigation to all major features
- Feature highlights and descriptions

### 2. Add School (`/addSchool`)
- Comprehensive form for adding new schools
- Form validation with real-time feedback
- Image upload functionality
- Responsive design for all devices

### 3. View Schools (`/showSchools`)
- E-commerce style grid layout
- Advanced search and filtering
- Responsive card design
- School information display

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: react-hook-form, Yup validation
- **Database**: MySQL (to be implemented)
- **File Upload**: Multer (to be implemented)
- **Deployment**: Vercel/Netlify ready

## 📊 Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

### GET `/api/schools`
- Fetches all schools from the database
- Returns JSON array of school objects

### POST `/api/schools`
- Creates a new school record
- Accepts multipart/form-data
- Validates all required fields
- Stores image in `schoolImages` folder

## 🎨 UI Components

- **Navigation**: Responsive navigation bar with active states
- **Forms**: Validated input fields with error handling
- **Cards**: School information displayed in attractive cards
- **Filters**: Search and filter controls for easy navigation
- **Responsive Grid**: Adapts to different screen sizes

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized typography for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder
3. Configure environment variables

## 🔮 Future Enhancements

- [ ] MySQL database integration
- [ ] User authentication system
- [ ] Admin dashboard
- [ ] School ratings and reviews
- [ ] Advanced search with geolocation
- [ ] Image optimization and CDN
- [ ] Export functionality (PDF/Excel)

## 📝 Project Structure

```
school-management/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school page
│   │   ├── showSchools/        # View schools page
│   │   ├── api/                # API routes
│   │   ├── components/         # Reusable components
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   └── ...
├── public/                     # Static assets
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js and modern web technologies**

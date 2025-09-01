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
### Backend
- **MySQL Database**: Robust data storage with proper relationships
- **API Routes**: RESTful API endpoints for CRUD operations
- **File Upload**: Secure image storage in dedicated folders
- **Data Validation**: Server-side validation and error handling

## 🚀 Getting Started

## 📱 Pages

### 1. Home Page (`/`)
- Landing page with project overview
- Navigation to all major features
- Feature highlights and descriptions
<img width="1891" height="899" alt="image" src="https://github.com/user-attachments/assets/7928091c-8420-42a9-bb8d-4dbd6735aa16" />

### 2. Add School (`/addSchool`)
- Comprehensive form for adding new schools
- Form validation with real-time feedback
- Image upload functionality
- Responsive design for all devices
<img width="1791" height="907" alt="image" src="https://github.com/user-attachments/assets/ffeff22a-1c75-45ac-a94d-814f3d32b3d2" />
<img width="1326" height="904" alt="image" src="https://github.com/user-attachments/assets/32f637c4-d4ef-46df-9599-c12c16e8ad7c" />

### 3. View Schools (`/showSchools`)
- E-commerce style grid layout
- Advanced search and filtering
- Responsive card design
- School information display
<img width="1874" height="838" alt="image" src="https://github.com/user-attachments/assets/d16ae338-35e5-4f3f-b0d9-22a5d3157c84" />


## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: react-hook-form, Yup validation
- **Database**: MySQL
- **Deployment**: Vercel

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


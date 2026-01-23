# Employee Performance Management Dashboard

A comprehensive Performance Management Dashboard built with Angular 17+, designed for organizations to track, evaluate, and visualize employee performance metrics.

## 🚀 Features

- **Authentication System**: Role-based access control (Admin, Manager, Employee)
- **Employee Management**: View and manage employee directory with detailed profiles
- **Performance Reviews**: Submit and track performance evaluations
- **Dashboard Analytics**: Visualize performance metrics and statistics
- **Performance History**: Track employee performance over time
- **Responsive Design**: Mobile-friendly interface using Angular Material

## 🛠️ Technologies Used

- **Framework**: Angular 17+
- **Language**: TypeScript
- **UI Library**: Angular Material
- **Styling**: CSS
- **Development Tools**: Node.js, Angular CLI

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation

1. Navigate to the project directory:
```bash
cd employee-performance-app
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

Start the development server:
```bash
ng serve
```

Or use:
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

## 👤 Demo Credentials

The application comes with pre-configured demo accounts:

- **Admin**
  - Username: `admin`
  - Password: `password123`
  - Full access to all features

- **Manager**
  - Username: `manager`
  - Password: `password123`
  - Can submit performance reviews and view employees

- **Employee**
  - Username: `employee`
  - Password: `password123`
  - Can view own profile and performance history

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/                 # Login component
│   │   ├── dashboard/             # Main dashboard
│   │   ├── employee-list/         # Employee directory
│   │   ├── employee-detail/       # Employee profile
│   │   └── performance-review/    # Performance review form
│   ├── models/                    # TypeScript interfaces
│   │   ├── employee.model.ts
│   │   ├── department.model.ts
│   │   ├── performance-record.model.ts
│   │   ├── review.model.ts
│   │   └── user.model.ts
│   ├── services/                  # Angular services
│   │   ├── auth.service.ts
│   │   ├── employee.service.ts
│   │   └── performance.service.ts
│   ├── guards/                    # Route guards
│   │   └── auth.guard.ts
│   ├── app.routes.ts              # Application routing
│   └── app.ts                     # Root component
├── styles.css                     # Global styles
└── index.html                     # Main HTML file
```

## 🎯 Key Features Explained

### 1. Authentication & Authorization
- Role-based access control
- Route guards to protect sensitive pages
- Persistent login state using localStorage

### 2. Dashboard
- Overview of key metrics (total employees, pending reviews, average rating)
- Performance distribution visualization
- Recent reviews tracking
- Quick action buttons

### 3. Employee Management
- Searchable and filterable employee list
- Detailed employee profiles
- Performance history tracking
- Department categorization

### 4. Performance Review System
- Multi-step form for comprehensive evaluations
- Score tracking across 6 categories:
  - Productivity
  - Quality
  - Communication
  - Teamwork
  - Innovation
  - Attendance
- Goals and achievements tracking
- Areas of improvement documentation

## 🎨 Customization

### Changing Theme Colors
Edit `src/styles.css` to modify the color scheme:
```css
/* Primary colors are defined using gradients */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding New Features
1. Generate new component: `ng generate component components/your-component`
2. Add route in `app.routes.ts`
3. Implement service methods as needed

## 📦 Building for Production

Build the project:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920x1080 and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Authentication guards on protected routes
- Role-based access control
- Input validation on all forms
- Secure password handling (in production, use proper backend authentication)

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as needed.

## 📄 License

This project is created for educational purposes.

## 🐛 Known Issues

- This is a frontend-only application with mock data
- For production use, integrate with a real backend API
- Authentication uses mock credentials for demonstration

## 📞 Support

For issues or questions, please create an issue in the repository.

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material Documentation](https://material.angular.io)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Material Design team for the UI components
- The open-source community

---

**Note**: This application uses mock data stored in services. For a production application, replace the mock data services with actual HTTP calls to a backend API.

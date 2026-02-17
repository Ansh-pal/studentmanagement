# Student Management System - Frontend

A modern Angular-based frontend application for managing student records. This application communicates with a .NET backend API to perform CRUD operations on student data.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── student-form/
│   │   │   ├── student-form.component.ts
│   │   │   └── student-form.component.html
│   │   └── student-list/
│   │       ├── student-list.component.ts
│   │       └── student-list.component.html
│   ├── models/
│   │   └── student.model.ts
│   ├── services/
│   │   └── student.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
├── main.ts
├── styles.css
└── index.html
```

## Features

- **Student List**: View all students with their details
- **Add Student**: Create new student records with validation
- **Edit Student**: Update existing student information
- **Delete Student**: Remove student records with confirmation
- **Responsive Design**: Mobile-friendly interface

## Student Model

```typescript
interface Student {
  id: number;
  name: string;        // Required
  rollNo: string;      // Required
  course: string;      // Optional
  marks: number;       // Optional
}
```

## Backend API Configuration

- **Base URL**: `http://localhost:5000`
- **Endpoint**: `api/students`
- **Protocol**: HTTP/REST
- **CORS**: Enabled

### API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Angular CLI 17.x or higher
- .NET backend running on `http://localhost:5000`

## Installation

1. Navigate to the project directory:
```bash
cd C:\Users\Ansh pal\Desktop\DOTNET\StudentManagement\frontend
```

2. Install dependencies:
```bash
npm install
```

## Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building for Production

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

Execute unit tests via Karma:
```bash
npm test
```

## Key Dependencies

- **@angular/core**: ^17.0.0 - Angular framework core
- **@angular/common**: ^17.0.0 - Common utilities
- **@angular/forms**: ^17.0.0 - Reactive and template-driven forms
- **@angular/platform-browser**: ^17.0.0 - Browser platform
- **rxjs**: ^7.8.0 - Reactive programming library

## Notes

- Ensure your .NET backend is running on `http://localhost:5000` before starting the application
- CORS should be configured on the backend to accept requests from the frontend
- The application uses standalone components (Angular 17 feature)
- HTTP Client is automatically provided in the bootstrapping process

## Author

Student Management System Team

## License

MIT

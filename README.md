# Health Information System 🏥

This project is a simple health information system for doctors to manage patient data and health programs. It allows doctors to create health programs (e.g. TB, Malaria, HIV), register new clients, and track which programs each client is enrolled in. Doctors can search for a client and view their profile, which shows personal details and the programs they are enrolled in. The system also exposes client profiles via a simple API so that other systems can retrieve this information. The code is clean, well-documented, and easy to follow, with beginners in mind.


![License](https://img.shields.io/badge/license-MIT-blue)

## 🌐 Live Demo

Check out the live application: [https://afya-health-connect.lovable.app/](https://afya-health-connect.lovable.app/)

---

## 🌐 Powerpoint Presentation

View the PowerPoint Presentation: https://docs.google.com/presentation/d/1hGNdHiflqHMFSaCehNP5ghKXZjbZM8zJ8P_dnpXNxEk/edit?usp=sharing

---


## 🚀 Features

- **Client Management**: Register and track client profiles with detailed records.
- **Program Management**: Create and organize health programs (e.g., TB, HIV).
- **Enrollment System**: Enroll clients in multiple programs seamlessly.
- **Interactive API Explorer**: Test and explore endpoints within the app.
- **Responsive UI**: Mobile-friendly design for accessibility anywhere.
- **Smart Search**: Quickly locate clients by name.
- **Toast Feedback**: Instant, user-friendly notifications.

---

## 🛠️ Tech Stack

- **React 18 + TypeScript**: Robust, type-safe frontend development.
- **Tailwind CSS**: Utility-first styling for a responsive, modern UI.
- **React Query**: Efficient data fetching and caching.
- **React Router v6**: Smooth, client-side navigation.
- **Radix UI**: Accessible, unstyled component primitives.
- **Mock Backend**: Simulates real-world API interactions.

---

## 📂 Project Structure

A modular, maintainable codebase:

```
src/
├── components/    # Reusable UI blocks (e.g., ClientCard)
├── pages/        # Routed views (e.g., Clients, Programs)
├── hooks/        # Custom hooks (e.g., useMobile)
├── services/     # API layer with mock delays
├── data/         # Mock DB and TypeScript models
├── ui/           # Custom Radix-based components
├── lib/          # Utility functions
├── App.tsx       # Root with routing and providers
└── main.tsx      # Entry point
```

---

## 🗄️ Mock Backend

An in-memory solution for development:

- **Storage**: Clients, programs, and enrollments stored in memory.
- **Simulation**: Realistic API delays via `services/api.ts`.
- **Flexibility**: Designed for easy real-backend integration.

**Note**: Data resets on refresh—perfect for prototyping!

---

## 📋 API Endpoints

```typescript
GET    /api/programs         // List all programs
GET    /api/clients          // List all clients
GET    /api/clients/:id      // Get client by ID
POST   /api/clients          // Add new client
POST   /api/programs         // Add new program
POST   /api/enroll           // Enroll client in program
GET    /api/clients/search   // Search clients by name
```

---

## 🗄️ Data Models

Type-safe structures in `data/models.ts`:

```typescript
interface Client {
  id: number;
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  enrolledPrograms: number[];
  createdAt: Date;
}

interface Program {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

interface Enrollment {
  clientId: number;
  programId: number;
  enrollmentDate: Date;
}
```

---

## 🔧 Setup & Installation

Get started in minutes:

1. **Clone the repo**:
   ```bash
   git clone [repository-url]
   cd health-information-system
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run locally**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌟 Why It Shines

- **Clean Code**: Modular design, consistent naming, DRY principles.
- **Performance**: React Query caching, optimized search.
- **Type Safety**: Full TypeScript coverage for reliability.
- **Scalability**: Ready for real DBs, auth, and more.
- **Accessibility**: Radix UI ensures inclusive design.

---

## 🔄 Future Enhancements

- **Real Backend**: Integrate MongoDB or PostgreSQL.
- **Authentication**: Add JWT-based user login.
- **Advanced Filters**: Search by age, gender, or program.
- **Reports**: Export data as CSV/PDF.
- **Monitoring**: Add Sentry for error tracking.

---

## 📚 Documentation

Dive into the interactive API explorer at `/api-docs` for endpoint details and live testing.

---

## 🤝 Contributing

1. Fork the repo.
2. Branch out: `git checkout -b feature/awesome-idea`.
3. Commit: `git commit -m "Add awesome idea"`.
4. Push: `git push origin feature/awesome-idea`.
5. Open a pull request!

Feedback is always welcome.

---

## 📝 License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

# Shakers Challenge - Project Finder 🚀

This repository contains the full-stack solution for the Shakers technical challenge. The application is a project search platform where users can browse, filter, and apply to various freelance opportunities.



## 📂 Project Structure

The project is organized into two main directories:

-   **/frontend**: Next.js 15 application with React 19.
-   **/backend**: NestJS REST API following Clean Architecture (DDD) principles.

---

## 💻 Frontend

Built with **Next.js** and **Mantine UI v8**, focusing on high-fidelity UI implementation based on the provided Figma design.

### Key Technologies:
* **React 19 & Next.js 15** (App Router).
* **Mantine UI v8**: Chosen for its robust component ecosystem and layout flexibility.
* **Jest & React Testing Library**: Unit tests for critical business logic (Filters, Modals, Detail View).
* **TypeScript**: Strict typing for data integrity across components.

### Architecture:
* `features/projects`: Modular domain logic including list components, detail views, and filtering.
* `services/`: API abstraction layer using Axios.
* `shared/`: Global reusable components (Header, Toast) and utility functions.

---

## ⚙️ Backend

Developed using **NestJS**, following **Domain-Driven Design (DDD)** principles to ensure scalability and decoupled logic.

### Key Technologies:
* **NestJS**: Enterprise-grade Node.js framework.
* **Repository Pattern**: Data is served through an interface abstraction. Currently using JSON-based static data storage, easily migratable to any SQL/NoSQL database.
* **Jest**: Unit tests for controllers, specifically validating query parameter parsing and error handling.

### Domain Layers:
* `domain/models/`: Core entities like `Project` and `StaticData`.
* `domain/repositories/`: Repository interfaces (Ports).
* `application/use-cases/`: Business logic services.
* `presentation/controllers/`: REST endpoints with CSV-to-Array parsing for advanced filtering.

---

## 🛠️ Installation & Setup

### Prerequisites:
* Node.js (v18 or superior)
* npm

### 1. Clone the repository:
```bash
git clone <your-repo-url>
cd shakers-challenge
```

### 2. Backend Setup:
```bash
cd backend
npm install
npm run start:dev
```
The API will run at http://localhost:3000.


### 3. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

The application will be available at http://localhost:3000 or http://localhost:3001 if port 3000 is already in use.

Remember to start first backend.


## 🧪 Running Tests
Unit tests have been implemented to ensure the reliability of the filtering logic and component rendering.

**Frontend Tests:**
```bash
cd frontend
npm test
```

**Backend Tests:**
```bash
cd backend
npm test
```


## ✨ Features & Highlights
* **Advanced Filtering:** Dynamic modal with URL synchronization via Search Params.
* **Candidacy Management:** "Apply" system with instant Toast feedback and state persistence (toggle between Apply/Withdraw).
* **Responsive Layout:** Fully optimized for mobile, tablet, and desktop views.
* **Metadata Processing:** Spanish locale formatting for dates and currency-agnostic budget displays.
* **Clean Commits:** Version control history follows the Conventional Commits standard.
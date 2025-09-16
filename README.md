# GameStore

This project was created as a hands-on way to learn about ASP.NET.

GameStore is a full-stack web application for managing a collection of video games. Built as a learning project with ASP.NET Core, it demonstrates modern web development practices, including RESTful API design, Entity Framework Core.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Backend: GameStore.API](#backend-gamestoreapi)
- [Frontend: React App](#frontend-react-app)
- [Database](#database)
- [Features](#features)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Learning Outcomes](#learning-outcomes)

---

## Project Overview

GameStore consists of:

- **Backend:** ASP.NET Core Web API (`GameStore.API`)
- **Frontend:** React app with Vite and Tailwind CSS (`frontend`)
- **Database:** SQLite, managed via Entity Framework Core

---

## Backend: GameStore.API

The `GameStore.API` project is the backend RESTful API. It manages all data operations for games and genres, serving as the bridge between the frontend and the database.

**Key Components:**

- **Program.cs**: Configures the web application, services, middleware, and API endpoints.
- **Entities/**: Core data models (`Game.cs`, `Genre.cs`).
- **Dtos/**: Data Transfer Objects for API requests/responses (`CreateGameDto.cs`, `UpdateGameDto.cs`, `GameDetailsDto.cs`, `GameSummaryDto.cs`, `GenreDto.cs`).
- **Endpoints/**: API route handlers for games and genres (`GamesEndpoints.cs`, `GenresEndpoints.cs`).
- **Data/**: Database context (`GameStoreContext.cs`), migrations, and data seeding (`DataExtensions.cs`).
- **Mapping/**: Logic for mapping between entities and DTOs (`GameMapping.cs`, `GenreMapping.cs`).
- **appsettings.json**: Configuration for database and environment settings.
- **GameStore.db**: SQLite database file.

**Features:**

- RESTful API with clear separation of concerns
- CRUD operations for games and genres
- Data validation and error handling
- Database migrations and seeding
- Clean architecture for maintainability

**How it works:**

1. The API receives HTTP requests from the frontend.
2. Endpoints handle requests, validate data, and interact with the database.
3. Entities are mapped to DTOs for structured data transfer.
4. Responses are sent back to the frontend.

---

## Frontend: React App

The `frontend` folder contains a modern React application built with Vite and styled using Tailwind CSS.

**Key Features:**

- Responsive UI for managing games and genres
- Components for listing, creating, and editing games and genres
- API integration with the ASP.NET backend
- Navigation and state management with React hooks

---

## Database

- **Type:** SQLite
- **Migrations:** Managed via Entity Framework Core
- **Seed Data:** Initial genres are seeded for demonstration

---

## Features

- Full CRUD for games and genres
- RESTful API design
- Modern, responsive frontend
- Database migrations and seeding

---

## How to Run

1. **Backend:**
   - Navigate to `GameStore.API` and run:
     ```sh
     dotnet run
     ```
2. **Frontend:**
   - Navigate to `frontend`, install dependencies:
     ```sh
     npm install
     ```
   - Start the dev server:
     ```sh
     npm run dev
     ```
3. Access the frontend in your browser (default: `http://localhost:5173`), and the API at its configured port.

---

## Technologies Used

- ASP.NET Core 9.0
- Entity Framework Core
- SQLite
- React
- Tailwind CSS

---

## Learning Outcomes

- Hands-on experience with ASP.NET Core Web API and Entity Framework Core
- Implemented full CRUD operations and API integration
- Learned about project structure, code organization, and best practices in full-stack development

---

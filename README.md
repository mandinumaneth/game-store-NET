# GameStore

> **A .NET Learning Project** - This project was created as a hands-on way to learn about ASP.NET Core and modern web development practices.

GameStore is a full-stack web application for managing a collection of video games. Built with ASP.NET Core backend and React frontend, it demonstrates RESTful API design, Entity Framework Core, database migrations, and image upload functionality.

---

## Project Overview

GameStore consists of:

- **Backend:** ASP.NET Core 9.0 Web API (`GameStore.API`)
- **Frontend:** React app with Vite and Tailwind CSS (`frontend`)
- **Database:** PostgreSQL, managed via Entity Framework Core
- **Image Storage:** Local file system with static file serving

---

## Backend: GameStore.API

The `GameStore.API` project is the backend RESTful API. It manages all data operations for games and genres, handles image uploads, and serves as the bridge between the frontend and the database.

**Key Components:**

- **Program.cs**: Configures the web application, services, middleware, API endpoints, and image upload/delete endpoints.
- **Entities/**: Core data models (`Game.cs`, `Genre.cs`) with image URL support.
- **Dtos/**: Data Transfer Objects for API requests/responses (`CreateGameDto.cs`, `UpdateGameDto.cs`, `GameDetailsDto.cs`, `GameSummaryDto.cs`, `GenreDto.cs`).
- **Endpoints/**: API route handlers for games and genres (`GamesEndpoints.cs`, `GenresEndpoints.cs`).
- **Data/**: Database context (`GameStoreContext.cs`), migrations, and data seeding (`DataExtensions.cs`).
- **Mapping/**: Logic for mapping between entities and DTOs (`GameMapping.cs`, `GenreMapping.cs`).
- **wwwroot/images/**: Storage directory for uploaded game images.
- **appsettings.json**: Configuration for database connection and environment settings.

**Features:**

- RESTful API with clear separation of concerns
- Full CRUD operations for games and genres
- Image upload and deletion with validation
- Static file serving for game images
- Data validation and error handling
- Database migrations and seeding
- CORS configuration for frontend integration
- Clean architecture for maintainability

**API Endpoints:**

- `GET /games` - Get all games
- `GET /games/{id}` - Get game by ID
- `POST /games` - Create new game
- `PUT /games/{id}` - Update game
- `DELETE /games/{id}` - Delete game
- `GET /genres` - Get all genres
- `POST /upload` - Upload game image
- `DELETE /api/images/{fileName}` - Delete image file

**How it works:**

1. The API receives HTTP requests from the frontend.
2. Endpoints handle requests, validate data, and interact with the database.
3. Image uploads are processed, saved to `wwwroot/images/`, and unique URLs are returned.
4. Entities are mapped to DTOs for structured data transfer.
5. Responses are sent back to the frontend.

---

## Frontend: React App

The `frontend` folder contains a modern React application built with Vite and styled using Tailwind CSS.

**Key Features:**

- **Responsive Card Layout**: Games displayed as cards with images in a 4-column grid
- **Image Upload**: Drag-and-drop or browse to upload game images
- **Image Management**: Preview, change, or remove images when editing
- **Real-time Preview**: See uploaded images instantly
- **Currency Display**: Prices shown in LKR (Sri Lankan Rupees) with formatting
- **Outlined Button Style**: Clean, modern outlined buttons throughout
- **Dark Theme**: Gaming-themed dark UI with custom background support
- **Form Validation**: Client-side validation for all inputs
- **API Integration**: Seamless communication with ASP.NET backend

**Components:**

- `GameList.jsx` - Card-based grid display of games with actions
- `GameForm.jsx` - Form for creating/editing games with image upload
- `GenreList.jsx` - Genre management component
- `Navigation.jsx` - App navigation bar
- `api.js` - API service layer for backend communication

---

## Database

- **Type:** PostgreSQL
- **Connection:** Host: localhost, Port: 5432, Database: GameStoreDB
- **Migrations:** Managed via Entity Framework Core
- **Seed Data:** Initial genres are seeded for demonstration
- **Schema:**
  - `Games` table: Id, Name, GenreId, Price, ReleaseDate, ImageUrl
  - `Genres` table: Id, Name

---

## Features

✅ **Full CRUD Operations** for games and genres  
✅ **Image Upload & Management** - Upload, change, or remove game images  
✅ **Card-Based UI** - Modern 4-column responsive grid layout  
✅ **LKR Currency** - Prices displayed in Sri Lankan Rupees  
✅ **PostgreSQL Database** - Production-ready relational database  
✅ **RESTful API Design** - Clean, well-structured API endpoints  
✅ **Static File Serving** - Efficient image delivery  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Dark Gaming Theme** - Custom background with glass morphism effects  
✅ **Data Validation** - Both client and server-side validation

---

## How to Run

### Prerequisites

- .NET 9.0 SDK
- Node.js (v16 or higher)
- PostgreSQL Server

### Database Setup

1. Install PostgreSQL or use Docker:

   ```sh
   docker run --name gamestore-postgres -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=GameStoreDB -p 5432:5432 -d postgres:16
   ```

2. Update connection string in `GameStore.API/appsettings.json` if needed:
   ```json
   {
     "ConnectionStrings": {
       "GameStore": "Host=localhost;Port=5432;Database=GameStoreDB;Username=postgres;Password=123"
     }
   }
   ```

### Backend Setup

1. Navigate to `GameStore.API`:

   ```sh
   cd GameStore.API
   ```

2. Restore packages and apply migrations:

   ```sh
   dotnet restore
   dotnet ef database update
   ```

3. Run the API:

   ```sh
   dotnet run
   ```

   The API will be available at `http://localhost:5274`

### Frontend Setup

1. Navigate to `frontend`:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the dev server:

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5174`

### Access the Application

- **Frontend:** `http://localhost:5174`
- **Backend API:** `http://localhost:5274`
- **Swagger (if enabled):** `http://localhost:5274/swagger`

---

## Technologies Used

### Backend

- ASP.NET Core 9.0
- Entity Framework Core 8.0
- Npgsql.EntityFrameworkCore.PostgreSQL 8.0.4
- PostgreSQL 16

### Frontend

- React 18
- Vite
- Tailwind CSS
- Axios (API calls)

### Tools & Libraries

- File Upload/Management
- Static File Serving
- CORS Configuration

---

## Learning Outcomes

This .NET learning project provided hands-on experience with:

- **ASP.NET Core Web API:** Building RESTful APIs with minimal API pattern
- **Entity Framework Core:** Database operations, migrations, and seeding
- **PostgreSQL:** Working with a production-grade relational database
- **File Upload:** Implementing image upload and storage functionality
- **React Integration:** Connecting frontend to backend APIs
- **Full-Stack Development:** Managing both client and server-side code
- **CRUD Operations:** Complete Create, Read, Update, Delete workflows
- **Data Validation:** Client and server-side input validation
- **Code Organization:** Clean architecture and separation of concerns
- **Modern UI/UX:** Building responsive, user-friendly interfaces

---

## Project Structure

```
game-store-NET/
├── GameStore.API/               # Backend ASP.NET Core API
│   ├── Data/                    # Database context and migrations
│   ├── Dtos/                    # Data Transfer Objects
│   ├── Endpoints/               # API route handlers
│   ├── Entities/                # Database models
│   ├── Mapping/                 # Entity-DTO mappings
│   ├── wwwroot/images/          # Uploaded game images
│   ├── Program.cs               # App configuration
│   └── appsettings.json         # Configuration settings
│
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── GameList.jsx     # Game card grid
│   │   │   ├── GameForm.jsx     # Add/Edit form
│   │   │   └── GenreList.jsx    # Genre management
│   │   ├── api.js               # API service layer
│   │   ├── App.jsx              # Main app component
│   │   └── index.css            # Global styles
│   ├── public/                  # Static assets
│   └── package.json             # Dependencies
│
└── README.md                    # This file
```

---

## Screenshots

### Game Collection View

- 4-column responsive card layout
- Game images with fallback
- LKR price display
- Released date information
- Edit and Delete actions

### Add/Edit Game Form

- Title, Genre, Price, Release Date inputs
- Image upload with preview
- Change or remove image options
- Dark theme with proper contrast

---

## Future Enhancements

- User authentication and authorization
- Search and filter functionality
- Sorting options (by name, date, price)
- Pagination for large collections
- Game ratings and reviews
- Categories and tags
- Export data to CSV/Excel
- Image compression and optimization
- Cloud storage integration (Azure Blob, AWS S3)

---

## License

This is a learning project and is free to use for educational purposes.

---

## Acknowledgments

Built as a hands-on learning experience to understand:

- Modern web application architecture
- ASP.NET Core ecosystem
- React best practices
- Full-stack development workflows

---

# 🚀 How to Run the Asian Cuisine Recipes Application

This document explains how to run the complete full-stack application with both the Angular frontend and FastAPI backend.

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- **Python** (v3.9 or higher) - [Download](https://www.python.org)
- **Git** (optional, for version control)

## 🏗️ Project Structure

```
angular_app/
├── src/                          # Angular frontend source code
│   ├── app/                      # Main application directory
│   │   ├── app.component.*       # Root component
│   │   ├── app.routes.ts         # Application routing
│   │   ├── services/             # Angular services (API calls)
│   │   └── features/             # Feature modules
│   │       ├── recipes/          # Recipes feature
│   │       │   ├── pages/        # Page components
│   │       │   └── recipes.routes.ts
│   │       └── about/            # About feature
│   ├── environments/             # Configuration files
│   ├── styles.scss               # Global styles
│   └── index.html                # HTML entry point
├── backend/                      # FastAPI backend
│   ├── main.py                   # FastAPI application
│   └── requirements.txt           # Python dependencies
├── package.json                  # Frontend dependencies
├── angular.json                  # Angular configuration
├── tsconfig.json                 # TypeScript configuration
└── run.md                        # This file
```

---

## 🎯 Quick Start (One Terminal - Sequential)

### Step 1: Install Frontend Dependencies

```bash
cd /path/to/angular_app
npm install
```

This installs all Angular and TypeScript dependencies.

### Step 2: Install Backend Dependencies

```bash
cd backend
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt
```

### Step 3: Run the Backend (Terminal 1)

```bash
cd backend

# Activate venv if not already activated
source venv/bin/activate

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Started server process [XXXXX]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 4: Run the Frontend (Terminal 2)

```bash
cd /path/to/angular_app

# Start Angular development server
npm start
```

You should see something like:
```
✔ Compiled successfully.

Application bundle generated successfully. (5.3 seconds)

The application will be available at http://localhost:4200/
```

---

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: Open your browser and navigate to `http://localhost:4200`
- **Backend API**: Available at `http://localhost:8000`
- **API Documentation**: Visit `http://localhost:8000/docs` for interactive API documentation

---

## 📱 Available Routes

### Frontend Routes
- `/` → Redirects to `/recipes`
- `/recipes` → View all recipes
- `/recipes/:id` → View recipe details
- `/recipes/create` → Create a new recipe
- `/about` → About page

### Backend API Endpoints
- `GET /api/recipes` → Get all recipes
- `GET /api/recipes/:id` → Get recipe by ID
- `GET /api/recipes/cuisine/:name` → Filter recipes by cuisine
- `POST /api/recipes` → Create new recipe
- `PUT /api/recipes/:id` → Update recipe
- `DELETE /api/recipes/:id` → Delete recipe
- `GET /api/health` → Health check

---

## 🛠️ Development Commands

### Frontend Commands

```bash
# Start development server with auto-reload
npm start

# Or use npm run dev (opens browser automatically)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm lint
```

### Backend Commands

```bash
# Run with auto-reload (development)
uvicorn main:app --reload --port 8000

# Run without auto-reload (production)
uvicorn main:app --port 8000

# Run on a different port
uvicorn main:app --reload --port 8001
```

---

## 🔍 Testing the API

### Using FastAPI's Built-in Swagger UI

1. Backend must be running on `http://localhost:8000`
2. Open `http://localhost:8000/docs` in your browser
3. Click on any endpoint to test it directly

### Using curl (Command Line)

```bash
# Get all recipes
curl http://localhost:8000/api/recipes

# Get a specific recipe
curl http://localhost:8000/api/recipes/1

# Get recipes by cuisine
curl http://localhost:8000/api/recipes/cuisine/Thai

# Create a new recipe (requires JSON body)
curl -X POST http://localhost:8000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ramen",
    "cuisine": "Japanese",
    "description": "Traditional Japanese noodle soup",
    "ingredients": ["noodles", "broth", "toppings"],
    "instructions": "Boil noodles and add broth",
    "difficulty": "medium",
    "prepTime": 20,
    "cookTime": 30,
    "servings": 2
  }'
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 4200 already in use:**
```bash
npm start -- --port 4300
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Clear Angular cache:**
```bash
npm run ng cache clean
```

### Backend Issues

**Port 8000 already in use:**
```bash
uvicorn main:app --port 8001 --reload
```

**Virtual environment not found:**
```bash
# Recreate virtual environment
python -m venv backend/venv
source backend/venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r backend/requirements.txt
```

**CORS errors:**
- Make sure backend is running with CORS enabled
- Check that frontend URL (http://localhost:4200) is in CORS allowed origins in `backend/main.py`

### Connection Issues

**Cannot reach backend from frontend:**

1. Verify backend is running: `curl http://localhost:8000/api/health`
2. Check API URL in `src/environments/environment.ts` matches backend URL
3. Ensure no firewall is blocking port 8000

---

## 📦 Deployment Notes

### Build for Production

```bash
# Build Angular frontend
npm run build

# Output goes to: dist/asian-recipes-app/

# To serve production build locally:
npm install -g http-server
http-server dist/asian-recipes-app -p 4200
```

### Backend Deployment

```bash
# Create production-optimized virtual environment
python -m venv prod_venv
source prod_venv/bin/activate
pip install -r requirements.txt

# Run with production settings
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 🎓 Key Learning Points

This project demonstrates:

1. **Angular Architecture**:
   - Standalone components
   - Feature-based modular structure
   - Lazy loading for performance
   - Service-based dependency injection

2. **FastAPI Backend**:
   - Type-safe API with Pydantic
   - CORS configuration
   - RESTful endpoint design
   - Built-in API documentation

3. **Full-Stack Communication**:
   - HTTP client from Angular to FastAPI
   - JSON request/response handling
   - Error handling on both client and server

4. **Best Practices**:
   - Separation of concerns
   - Environment configuration
   - Reactive programming patterns
   - Code organization and comments

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HTTP Client Guide](https://angular.io/guide/http-client)
- [Angular Routing](https://angular.io/guide/router)

---

## ✅ Checklist

Before running the app, verify:

- [ ] Node.js and npm installed (`node --version`, `npm --version`)
- [ ] Python installed (`python --version`)
- [ ] Current directory is the project root
- [ ] `npm install` completed successfully
- [ ] Python virtual environment created and activated
- [ ] `pip install -r requirements.txt` completed successfully
- [ ] Port 4200 is available (or specify different port)
- [ ] Port 8000 is available (or specify different port)

---

## 🎉 You're Ready!

Follow the "Quick Start" section above to get both servers running. Happy coding! 🚀

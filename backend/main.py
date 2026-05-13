from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Initialize FastAPI application
app = FastAPI(
    title="Asian Cuisine Recipes API",
    description="API for managing Asian cuisine recipes",
    version="1.0.0"
)

# CORS Middleware - Allow requests from Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:3000"],
    allow_origin_regex=r"^http://localhost:\d+$|^http://127\.0\.0\.1:\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# DATA MODELS - Pydantic models for type safety and validation
# ============================================================================

class Recipe(BaseModel):
    """
    Recipe model - Represents a recipe with all its properties
    Pydantic provides automatic validation and documentation
    """
    id: int
    name: str
    cuisine: str  # e.g., 'Thai', 'Chinese', 'Japanese'
    description: str
    ingredients: List[str]
    instructions: str
    difficulty: str  # 'easy', 'medium', 'hard'
    prepTime: int  # minutes
    cookTime: int  # minutes
    servings: int
    imageUrl: Optional[str] = None
    createdAt: str
    updatedAt: str


class RecipeCreate(BaseModel):
    """
    Model for creating a new recipe (without id and timestamps)
    """
    name: str
    cuisine: str
    description: str
    ingredients: List[str]
    instructions: str
    difficulty: str
    prepTime: int
    cookTime: int
    servings: int
    imageUrl: Optional[str] = None


# ============================================================================
# SAMPLE DATA - In-memory storage (replace with database in production)
# ============================================================================

recipes_db = {
    1: {
        "id": 1,
        "name": "Pad Thai",
        "cuisine": "Thai",
        "description": "A popular Thai street food made with stir-fried rice noodles, shrimp, and a tangy tamarind sauce.",
        "ingredients": [
            "3 cups rice noodles",
            "2 cups shrimp",
            "2 tablespoons tamarind paste",
            "2 eggs",
            "2 cloves garlic",
            "1 cup bean sprouts",
            "3 scallions",
            "1/4 cup peanuts"
        ],
        "instructions": "1. Cook rice noodles according to package directions.\n2. Heat oil in a wok over high heat.\n3. Add garlic and shrimp, cook until pink.\n4. Add noodles and tamarind paste, toss well.\n5. Push noodles to the side, scramble eggs in the empty space.\n6. Mix eggs with noodles.\n7. Add bean sprouts and scallions.\n8. Serve topped with peanuts and lime.",
        "difficulty": "easy",
        "prepTime": 15,
        "cookTime": 10,
        "servings": 2,
        "imageUrl": "https://images.unsplash.com/photo-1536599018102-c1fbd05764c3?w=400",
        "createdAt": "2024-01-01T10:00:00",
        "updatedAt": "2024-01-01T10:00:00"
    },
    2: {
        "id": 2,
        "name": "Kung Pao Chicken",
        "cuisine": "Chinese",
        "description": "A classic Sichuan dish with tender chicken, roasted peanuts, and dried red chilies in a savory sauce.",
        "ingredients": [
            "1.5 lbs chicken breast",
            "1 cup peanuts",
            "5 dried red chilies",
            "3 tablespoons soy sauce",
            "2 tablespoons rice vinegar",
            "1 tablespoon sesame oil",
            "3 cloves garlic",
            "2 scallions"
        ],
        "instructions": "1. Cut chicken into bite-sized cubes.\n2. Heat oil in a wok over high heat.\n3. Stir-fry chicken until cooked through.\n4. Remove chicken and set aside.\n5. Add garlic and dried chilies to the wok.\n6. Return chicken and add peanuts.\n7. Mix in soy sauce, vinegar, and sesame oil.\n8. Toss everything together and serve hot.",
        "difficulty": "medium",
        "prepTime": 20,
        "cookTime": 15,
        "servings": 4,
        "imageUrl": "https://images.unsplash.com/photo-1587080696291-0c5a52cf1c8a?w=400",
        "createdAt": "2024-01-02T10:00:00",
        "updatedAt": "2024-01-02T10:00:00"
    }
}

next_recipe_id = 3


# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint - welcome message"""
    return {"message": "Welcome to Asian Cuisine Recipes API"}


@app.get("/api/recipes", response_model=List[Recipe])
async def get_all_recipes():
    """
    GET all recipes
    Returns a list of all recipes in the database
    """
    return list(recipes_db.values())


@app.get("/api/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: int):
    """
    GET a specific recipe by ID
    Raises 404 if recipe not found
    """
    if recipe_id not in recipes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with id {recipe_id} not found"
        )
    return recipes_db[recipe_id]


@app.post("/api/recipes", response_model=Recipe, status_code=status.HTTP_201_CREATED)
async def create_recipe(recipe: RecipeCreate):
    """
    POST - Create a new recipe
    Returns the created recipe with generated id and timestamps
    """
    global next_recipe_id

    now = datetime.now().isoformat()
    new_recipe = Recipe(
        id=next_recipe_id,
        createdAt=now,
        updatedAt=now,
        **recipe.dict()
    )

    recipes_db[next_recipe_id] = new_recipe.dict()
    next_recipe_id += 1

    return new_recipe


@app.put("/api/recipes/{recipe_id}", response_model=Recipe)
async def update_recipe(recipe_id: int, recipe: RecipeCreate):
    """
    PUT - Update an existing recipe
    Returns the updated recipe
    """
    if recipe_id not in recipes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with id {recipe_id} not found"
        )

    now = datetime.now().isoformat()
    existing_recipe = recipes_db[recipe_id]

    updated_recipe = Recipe(
        id=recipe_id,
        createdAt=existing_recipe["createdAt"],
        updatedAt=now,
        **recipe.dict()
    )

    recipes_db[recipe_id] = updated_recipe.dict()
    return updated_recipe


@app.delete("/api/recipes/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recipe(recipe_id: int):
    """
    DELETE - Remove a recipe
    Returns 204 No Content on success
    """
    if recipe_id not in recipes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipe with id {recipe_id} not found"
        )

    del recipes_db[recipe_id]
    return None


@app.get("/api/recipes/cuisine/{cuisine_name}", response_model=List[Recipe])
async def get_recipes_by_cuisine(cuisine_name: str):
    """
    GET recipes filtered by cuisine
    Example: /api/recipes/cuisine/Thai
    """
    filtered_recipes = [
        recipe for recipe in recipes_db.values()
        if recipe["cuisine"].lower() == cuisine_name.lower()
    ]

    if not filtered_recipes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No recipes found for cuisine: {cuisine_name}"
        )

    return filtered_recipes


# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "Asian Cuisine Recipes API"
    }

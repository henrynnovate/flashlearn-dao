from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes, deck_routes, flashcard_routes
from database import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Flashlearn DAO backend is live"}

@app.get("/test-db")
async def test_db():
    collections = await db.list_collection_names()
    return {"collections": collections}

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(deck_routes.router, prefix="/decks", tags=["Decks"])
app.include_router(flashcard_routes.router, prefix="/flashcards", tags=["Flashcards"])

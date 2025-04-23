from fastapi import APIRouter, HTTPException, Depends
from models.deck_model import DeckCreate, DeckInDB
from utils.auth import get_current_user  # The updated auth method to get current user
from database import db

router = APIRouter()

# Create deck endpoint
@router.post("/create", response_model=DeckInDB)
async def create_deck(deck: DeckCreate, token: dict = Depends(get_current_user)):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    
    # Use user_id from the token
    new_deck = {
        "title": deck.title,
        "description": deck.description,
        "user_id": token["user_id"],  # User ID from the token
        "flashcards": []
    }
    
    result = await db.decks.insert_one(new_deck)
    return {**new_deck, "id": str(result.inserted_id)}

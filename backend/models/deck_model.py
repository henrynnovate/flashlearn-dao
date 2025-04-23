from pydantic import BaseModel
from typing import List, Optional

class DeckCreate(BaseModel):
    title: str
    description: Optional[str] = None
    

class DeckInDB(DeckCreate):
    id: str
    flashcards: List[str] = []  # List of flashcard IDs associated with this deck

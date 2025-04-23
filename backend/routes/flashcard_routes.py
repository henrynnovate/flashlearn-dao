from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def test_decks():
    return {"message": "Flashcard route working"}

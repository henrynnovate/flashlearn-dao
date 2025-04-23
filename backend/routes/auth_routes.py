from fastapi import APIRouter, HTTPException, Depends
from models.user_model import UserCreate, UserLogin, UserInDB
from utils.auth import hash_password, verify_password, create_access_token
from database import db
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/register", response_model=UserInDB)
async def register(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)
    new_user = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed,
        "xp": 0,
        "streak": 0,
        "wallet_address": None
    }
    result = await db.users.insert_one(new_user)
    
    # Prepare the response object
    user_response = UserInDB(
        id=str(result.inserted_id),
        username=new_user["username"],
        email=new_user["email"],
        hashed_password=new_user["hashed_password"],  # Consider removing or obfuscating the password
        wallet_address=new_user["wallet_address"],
        xp=new_user["xp"],
        streak=new_user["streak"]
    )
    return user_response


@router.post("/login")
async def login(user: UserLogin):
    found = await db.users.find_one({"email": user.email})
    if not found or not verify_password(user.password, found["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a token and return it with the user information
    token = create_access_token({"user_id": str(found["_id"])})
    return {"access_token": token, "token_type": "bearer", "user": {
        "username": found["username"],
        "email": found["email"],
        "xp": found["xp"],
        "streak": found["streak"],
        "wallet_address": found.get("wallet_address", None)
    }}

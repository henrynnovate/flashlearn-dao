from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    id: str
    username: str
    email: EmailStr
    hashed_password: str
    wallet_address: Optional[str] = None
    xp: int = 0
    streak: int = 0

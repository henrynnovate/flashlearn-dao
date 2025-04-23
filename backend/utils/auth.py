from fastapi import Request
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Optional
import os

# Load secret key from environment variable
SECRET_KEY = os.getenv("SECRET_KEY", "flashlearnsecret")  # Make sure to set this environment variable securely
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password using bcrypt
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify if a plain password matches the hashed password
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# Create access token with a 60-minute expiration
def create_access_token(data: dict, expires_minutes: int = 60) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Verify and decode JWT token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# Function to get the current user from the token
def get_current_user(request: Request) -> Optional[dict]:
    authorization_header = request.headers.get("Authorization")
    if authorization_header is None:
        return None

    token = authorization_header.split(" ")[1]  # Split to get the token from 'Bearer <token>'
    payload = verify_token(token)
    if payload is None:
        return None
    return payload

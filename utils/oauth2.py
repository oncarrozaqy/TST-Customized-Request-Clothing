from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Annotated
from .database import cursor
from models.tokendata import TokenData
from .authpass import verify_password
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='authentications/login')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta :
        expire = datetime.utcnow() + expires_delta
    else :
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("user")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data

def authenticate_user(username: str, password: str):
    query = ("SELECT * FROM users WHERE username = %s")
    cursor.execute(query, (username,))
    result = cursor.fetchall()
    if not result :
        return False
    else :
        if verify_password(password, result[0][7]) :
            return result[0]
        else :
            return False

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)
    query = ("SELECT * FROM users WHERE username = %s")
    cursor.execute(query, (token_data.username,))
    result = cursor.fetchall()
    if not result :
        raise credentials_exception
    else :
        return result[0]
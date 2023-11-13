from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from datetime import datetime, timedelta
from ..database import cursor
from ..oauth2 import create_access_token, authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES
from ..utils import verify

auth_router = APIRouter(
    prefix='/authentications',
    tags=['Authentications']
)

@auth_router.post('/login')
async def login(login: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(login.username, login.password)
    if not user :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password.")
    else :
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"user": user[6]}, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
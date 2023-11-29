from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta
from ..database import cursor
from ..oauth2 import create_access_token, authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES
from ..utils import hash_password
from ..database import cursor, conn

auth_router = APIRouter(
    prefix='/authentications',
    tags=['Authentications']
)


@auth_router.post('/login')
async def login(login: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(login.username, login.password)
    if not user :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You use wrong username or password.")
    else :
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"user": user[6]}, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    
@auth_router.post('/register')
async def register_user(firstname: str, lastname: str, phonenumber: str, address: str, email: str, password: str, username: str, role: str):
    if (len(username) <= 3):
        raise HTTPException(status_code=405, detail="Username must be at least 4 characters!")
        return
    
    if (len(password) <= 5):
        raise HTTPException(status_code=405, detail="Password must be at least 6 characters!")
        return
    
    query = ("SELECT * FROM users")
    cursor.execute(query)
    result = cursor.fetchall()
    if not result :
        userid = 1
    else :
        query = ("SELECT MAX(userid) FROM users")
        cursor.execute(query)
        result = cursor.fetchall()
        userid = result[0][0] + 1

    query = ("SELECT * FROM users WHERE email = %s")
    cursor.execute(query, (email,))
    result = cursor.fetchall()
    if result :
        return "Email unavailable! Try Another One!"
    else :
        query = ("SELECT * FROM users WHERE username = %s")
        cursor.execute(query, (username,))
        result = cursor.fetchall()
        if result :
            return "Username unavailable! Try Another One!"
        else :
            query = ("INSERT INTO users (userID, firstName, lastName, email, phoneNumber, shippingAddress, username, password , role) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")
            cursor.execute(query, (userid, firstname, lastname, phonenumber, address, email, username, hash_password(password), role))
            conn.commit()
            return "Registration Completed!"
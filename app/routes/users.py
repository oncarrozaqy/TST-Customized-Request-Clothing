from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from ..models.users import Users
from ..database import cursor, conn
from ..oauth2 import get_current_user
from ..utils import hash_password


user_router = APIRouter(
    tags=['Users']
)

users = {}

@user_router.get('/users')
async def read_all_users(user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM users")
    cursor.execute(query)
    result = cursor.fetchall()
    return result

@user_router.delete('/users')
async def delete_users(userID: int, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM users WHERE userID = %s")
    cursor.execute(query, (userID, ))
    result = cursor.fetchall()
    if result:
        query = ("DELETE FROM users WHERE userID = %s")
        cursor.execute(query, (userID, ))
        conn.commit()
        return "Users Deleted"
    else:
        raise HTTPException(
		status_code=404, detail=f'User not found'
	)
        
@user_router.post('/register')
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
        return "Email "+email+" already exists."
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
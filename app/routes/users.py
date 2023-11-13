from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from ..models.users import Users
from ..database import cursor, conn
from ..oauth2 import get_current_user


user_router = APIRouter(
    #prefix='/users',
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
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from typing import Annotated
from models.users import Users
from utils.database import cursor, conn
from utils.oauth2 import get_current_user

customization_router = APIRouter(
    tags=['Customizations']
)

customizations = {}

@customization_router.get('/customizationRequests')
async def read_all_request(user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM customizationRequests")
    cursor.execute(query)
    result = cursor.fetchall()
    return result

@customization_router.get('/customizationRequests/{userID}')
async def read_request(userID:int, user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM customizationRequests WHERE customerid = %s")
    cursor.execute(query, (userID, ))
    result = cursor.fetchall()
    request_list = []
    request_list.append(result)
    
    if not request_list:
        raise HTTPException (status_code=404, detail=f'Request not found')
    return request_list

@customization_router.get('/customizationRequests/{font}/{color}/{size}/{productType}')
async def clothes_preferences(font: str, color: str, size: str, productType: str, user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products WHERE default_font LIKE %s AND default_color LIKE %s AND size LIKE %s AND productType LIKE %s")
    cursor.execute(query, (f"%{font}%", f"%{color}%", f"%{size}%", f"%{productType}%"))
    result = cursor.fetchall()
    if not result:
        raise HTTPException(status_code=404, detail="There's no product match your preference. Please try another one.")
    else:
        return result


@customization_router.post('/customizationRequests')
async def create_request(productID:int, specialInstructions: str, user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products WHERE productID = %s")
    cursor.execute(query, (productID, ))
    result = cursor.fetchall()
    if result :
        userID = user[0]
        query = ("SELECT MAX(customizationID) FROM customizationRequests")
        cursor.execute(query)
        result = cursor.fetchall()
        customizationID = result[0][0] + 1
        orderDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = ("INSERT INTO customizationRequests (customizationID, customerID, productID, specialInstructions, orderDate) VALUES (%s, %s, %s, %s, %s)")
        cursor.execute(query, (customizationID, userID, productID, specialInstructions, orderDate))
        conn.commit()
        return "Request Created"
    else:
        raise HTTPException(
			status_code=404, detail=f'Product not found'
		)

@customization_router.delete('/customizationRequests/{customizationID}')
async def delete_request(customizationID: int, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM customizationRequests WHERE customizationID = %s")
    cursor.execute(query, (customizationID, ))
    result = cursor.fetchall()
    if result:
        query = ("DELETE FROM customizationRequests WHERE customizationID = %s")
        cursor.execute(query, (customizationID, ))
        conn.commit()
        return "Request Deleted"
    else:
        raise HTTPException(
		status_code=404, detail=f'Request not found'
	)
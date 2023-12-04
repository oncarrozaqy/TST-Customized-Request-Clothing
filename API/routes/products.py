from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from ..models.users import Users
from ..models.products import Products
from ..utils.database import cursor, conn
from ..utils.oauth2 import get_current_user

product_router = APIRouter(
    tags=['Products']
)

products = {}

@product_router.get('/products')
async def read_all_products(user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products")
    cursor.execute(query)
    result = cursor.fetchall()
    return result

@product_router.get('/products/{productID}')
async def get_product_by_id(productID: int,user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products WHERE productID = %s")
    cursor.execute(query, (productID, ))
    result = cursor.fetchall()
    if not result:
        raise HTTPException(status_code=404, detail=f'Product not found')
    return result

@product_router.post('/products')
async def create_product(description: str, price: float , stock: int, default_font: str, default_color: str, size:str, productType: str, imageurl: str, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT MAX(productID) FROM products")
    cursor.execute(query,)
    result = cursor.fetchall()
    productid = result[0][0] + 1
    query = ("INSERT INTO products (productID, description, price, stock, default_font, default_color, size, productType, imageurl) VALUES (%s, %s, %s, %s, %s,  %s, %s, %s, %s)")
    cursor.execute(query, (productid, description, price, stock, default_font, default_color, size, productType, imageurl))
    conn.commit()
    return "Product Created"

@product_router.put('/products/{productID}')
async def update_product(productID: int, description: str, price: float , stock: int, default_font: str, default_color: str, size:str, productType: str, imageurl: str, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM products WHERE productID = %s")
    cursor.execute(query, (productID, ))
    result = cursor.fetchall()
    if result:
        query = ("UPDATE products SET description = %s, price = %s, stock = %s, default_font = %s, default_color = %s, size = %s, productType = %s, imageurl=%s WHERE productID = %s")
        cursor.execute(query, (description, price, stock, default_font, default_color, size, productType, productID, imageurl))
        conn.commit()
        return "Product Updated"
    else:
        raise HTTPException(
            status_code=404, detail=f'Product not found'
        )
        
@product_router.delete('/products/{productID}')
async def delete_product(productID: int, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    query = ("SELECT * FROM products WHERE productID = %s")
    cursor.execute(query, (productID, ))
    result = cursor.fetchall()
    if result:
        query = ("DELETE FROM products WHERE productID = %s")
        cursor.execute(query, (productID, ))
        conn.commit()
        return "Product Deleted"
    else:
        raise HTTPException(
        status_code=404, detail=f'Product not found'
    )
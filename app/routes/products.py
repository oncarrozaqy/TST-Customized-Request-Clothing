from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from ..models.users import Users
from ..models.products import Products
from ..database import cursor, conn
from ..oauth2 import get_current_user

product_router = APIRouter(
    #prefix='/products',
    tags=['Products']
)

products = {}

@product_router.get('/products')
async def read_all_products(user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products")
    cursor.execute(query)
    result = cursor.fetchall()
    return result

@product_router.get('/products/{Cloth}')
async def clothes_preferences (font: str, color: str, size: str, productType: str, user: Annotated[Users, Depends(get_current_user)]):
    query = ("SELECT * FROM products WHERE font = %s AND color= %s AND size = %s AND productType = %s")
    cursor.execute(query, (font, color, size, productType))
    result = cursor.fetchall()
    preference_product = []
    preference_product.append(result)
    if not preference_product:
        raise HTTPException (status_code=404, detail=f"Product not found")
    return preference_product

# Delete Product
# Add Product
from pydantic import BaseModel

class Products(BaseModel):
    productID: int
    description: str
    price: int
    stock: int
    font: str
    color: str
    size: str
    productType: str
    imageurl: str

    class Config:
        json_schema_extra = {
            "example": {
                "productID": 1,
                "description": "Cotton T-shirt with various colors",
                "price": 20.0,
                "stock": 100,
                "font": "Arial",
                "color": "Red",
                "size": "Large",
                "productType": "T-shirt",
                "imageurl": "https:google.com"
            }
        }
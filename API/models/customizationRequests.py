from pydantic import BaseModel
from datetime import datetime

class Customization(BaseModel):
    customizationID: int
    customerID: int
    productID: int
    specialInstructions: str
    orderDate: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "customizationID": 1,
                "customerID": 1,
                "productID": 1,
                "specialInstructions": "Please use high-quality fabric.",
                "orderDate": "2023-09-19T14:30:00"
            }
        }
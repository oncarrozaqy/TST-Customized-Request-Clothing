from pydantic import BaseModel

class Users(BaseModel):
    userID : int
    firstName : str
    lastName : str
    email : str
    phoneNumber : str
    shippingAddress : str
    username : str
    password : str
    role : str

    class Config:
        json_schema_extra = {
            "example": {
                "userID": 1,
                "firstName": "John",
                "lastName": "Doe",
                "email": "john@example.com",
                "phoneNumber": "123-456-7890",
                "shippingAddress": "123 Main Street, City",
                "username" : "john_doe",
                "password": "123456",
                "role" : "admin"
            }
        }
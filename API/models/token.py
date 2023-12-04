from pydantic import BaseModel

# Pydantic model for token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
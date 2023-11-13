from fastapi import FastAPI
import uvicorn
from .routes.customizationRequests import customization_router
from .routes.users import user_router
from .routes.products import product_router
from .routes.auth import auth_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(customization_router)
app.include_router(user_router)
app.include_router(product_router)

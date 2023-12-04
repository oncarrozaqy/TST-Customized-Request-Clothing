from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.customizationRequests import customization_router
from routes.users import user_router
from routes.products import product_router
from routes.auth import auth_router
from routes.FashUp import fashup_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(customization_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(fashup_router)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": f"Welcome to Customization API!"}

from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from ..models.users import Users
from ..utils.oauth2 import get_current_user
import requests

# Fungsi untuk mendapatkan token baru
def get_new_token():
    payload = {
        "username": "filanova",
        "password": "filanova"
    }

    r = requests.post('http://fashupauth.hactd6f8f6brg2ca.southeastasia.azurecontainer.io/token', data=payload)
    return r.json()['access_token']

# Fungsi untuk melakukan permintaan dengan token
def make_authenticated_request(url, payload):
    token = get_new_token()
    
    # Set header otentikasi
    headers = {'Authorization': f'Bearer {token}'}

    # Lakukan permintaan dengan menyertakan header otentikasi dan body request
    r = requests.get(url, headers=headers, data=payload)

    # Jika token tidak valid, dapatkan token baru dan coba lagi
    if r.status_code == 401:
        token = get_new_token()
        headers = {'Authorization': f'Bearer {token}'}
        r = requests.get(url, headers=headers, data=payload)

    return r


fashup_router = APIRouter(
    tags=['fashup']
)

fashup = {}


@fashup_router.get('/productrecommendations')
async def get_product_based_on_material(material_input: str, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    response = make_authenticated_request(f'http://fashupauth.hactd6f8f6brg2ca.southeastasia.azurecontainer.io/recommendation?material_input={material_input}', {})
    return response.json()

@fashup_router.get('/quantity')
async def get_quantity(material_input: str, weight_input: int, user: Annotated[Users, Depends(get_current_user)]):
    if user[8] != "admin" :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not an admin.")
    response = make_authenticated_request(f'http://fashupauth.hactd6f8f6brg2ca.southeastasia.azurecontainer.io/quantity?material_input={material_input}&weight_input={weight_input}', {})
    return response.json()




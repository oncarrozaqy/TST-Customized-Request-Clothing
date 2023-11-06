from fastapi import FastAPI, HTTPException
import json
from datetime import datetime
 
json_filename="core.json"

with open(json_filename,"r") as read_file:
	data = json.load(read_file)

app = FastAPI()

@app.get('/products')
async def read_all_products():
	return data['products']


@app.get('/products/{Cloth}')
async def clothes_preferences (font: str, color: str, size: str, productType: str):
	preference_product = []
	for product_item in data['products']:
		if (product_item['font'] == font and product_item['color'] == color and  product_item['size'] == size and  product_item['productType'] == productType):
			preference_product.append(product_item)
	if not preference_product:
		raise HTTPException(
			status_code=404, detail=f"Product not found "
		)
	return preference_product

@app.post('/customizationRequests')
async def create_request(customerID: int, productID:int, specialInstructions: str):
	for product_item in data['products']:
		if product_item['productID'] == productID:
			orderDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
			found = True
			new_request = {
				"customizationID" : len(data['customizationRequests']) + 1 ,
				"customerID" : customerID,
				"productID" : productID,
				"specialInstructions": specialInstructions,
				"orderDate" : orderDate
			}
			break
	if found:
		data["customizationRequests"].append(new_request)
		with open(json_filename,"w") as write_file:
			json.dump(data, write_file)
		return "Request Created"
	else:
		raise HTTPException(
			status_code=404, detail=f'Product not found'
		)


@app.delete('/customizationRequests/{customizationID}')
async def delete_request(customizationID: int):
	found = False
	for idx, request_item in enumerate(data['customizationRequests']):
		if request_item['customizationID'] == customizationID:
			found = True
			data['customizationRequests'].pop(idx)
			
			with open(json_filename,"w") as write_file:
				json.dump(data, write_file)
			return "Deleted"
	
	if not found:
		return "Request ID not found."
	raise HTTPException(
		status_code=404, detail=f'Request not found'
	)

@app.get('/customizationRequests/{customerID}')
async def read_request(customerID:int):
	request_list =[]
	for request_item in data['customizationRequests']:
		if request_item['customerID'] == customerID:
			request_list.append(request_item)
	
	if not request_list:
		raise HTTPException(
			status_code=404, detail=f'Request not found'
		)
	return request_list
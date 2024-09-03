from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Create FastAPI instance
app = FastAPI()

# CORS middleware to allow your Angular frontend to communicate with the FastAPI backend
origins = [
    "http://localhost:4200",  # Add the URL where your Angular app runs
    "http://127.0.0.1:4200"    # Alternate localhost address
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# In-memory "database" (a simple list of dictionaries)
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
    {"id": 3, "name": "Item 3"}
]

# Pydantic model for item creation and update
class Item(BaseModel):
    name: str

# CRUD operations

# Create a new item
@app.post("/items/")
def create_item(item: Item):
    item_id = len(items) + 1  # Simple way to generate a new ID
    new_item = {"id": item_id, "name": item.name}
    items.append(new_item)
    return new_item

# Read all items
@app.get("/items/")
def read_items():
    return items

# Read a single item by ID
@app.get("/items/{item_id}")
def read_item(item_id: int):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update an item by ID
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    existing_item = next((i for i in items if i["id"] == item_id), None)
    if existing_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    existing_item["name"] = item.name
    return existing_item

# Delete an item by ID
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    items = [item for item in items if item["id"] != item_id]
    return {"message": "Item deleted"}

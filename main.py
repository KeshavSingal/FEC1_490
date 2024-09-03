from fastapi import FastAPI, HTTPException

# Create FastAPI instance
app = FastAPI()

# In-memory "database" (a simple list of dictionaries)
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
    {"id": 3, "name": "Item 3"}
]

# CRUD operations

# Create a new item
@app.post("/items/")
def create_item(name: str):
    item_id = len(items) + 1  # Simple way to generate a new ID
    new_item = {"id": item_id, "name": name}
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
def update_item(item_id: int, name: str):
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item["name"] = name
    return item

# Delete an item by ID
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items
    item = next((item for item in items if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    items = [item for item in items if item["id"] != item_id]
    return {"message": "Item deleted"}

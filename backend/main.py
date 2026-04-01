from fastapi import FastAPI

from routes import router

app = FastAPI(
    title="FinSight Pro API",
    version="0.1.0"
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "FinSight Pro API is running"}

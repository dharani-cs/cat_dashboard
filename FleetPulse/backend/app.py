from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

# Import routers
from routers.auth import router as auth_router
from routers.vehicle import router as vehicle_router
from routers.predict import router as predict_router

# Create tables when the database is available
try:
    Base.metadata.create_all(bind=engine)
except Exception as exc:
    print(f"Database initialization skipped: {exc}")

app = FastAPI(
    title="FleetPulse API",
    version="1.0.0",
    description="AI Predictive Maintenance System"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "🚜 FleetPulse API Running Successfully"
    }

# Routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(vehicle_router, prefix="/vehicles", tags=["Vehicles"])
app.include_router(predict_router, prefix="/predict", tags=["Prediction"])
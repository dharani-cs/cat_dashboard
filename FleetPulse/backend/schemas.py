from pydantic import BaseModel, EmailStr


class HealthResponse(BaseModel):
    status: str


# ---------------- VEHICLE ----------------

class VehicleCreate(BaseModel):
    fleet_id: str
    status: str = "active"
    mileage: float = 0.0


class VehicleResponse(VehicleCreate):
    id: int


# ---------------- USER ----------------

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    employee_id: str
    department: str
    role: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    mobile: str
    employee_id: str
    department: str
    role: str

    class Config:
        from_attributes = True
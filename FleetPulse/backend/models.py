from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func

from database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    fleet_id = Column(String, nullable=False, index=True)
    status = Column(String, default="active")
    mileage = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, index=True, nullable=False)

    mobile = Column(String(15), nullable=False)

    employee_id = Column(String(30), unique=True, nullable=False)

    department = Column(String(50), nullable=False)

    role = Column(String(30), nullable=False)

    password = Column(String(255), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def prediction_health():
    return {"status": "ok", "service": "prediction"}

from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal



# --- Migration: add 'table_number' column if not exists ---
from sqlalchemy import inspect, text
with engine.connect() as conn:
    insp = inspect(conn)
    columns = [col['name'] for col in insp.get_columns('bookings')]
    if 'table_number' not in columns:
        conn.execute(text('ALTER TABLE bookings ADD COLUMN table_number INTEGER NOT NULL DEFAULT 1'))

models.Base.metadata.create_all(bind=engine)


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/bookings/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db=db, booking=booking)

@app.get("/bookings/", response_model=list[schemas.Booking])
def read_bookings(skip: int = 0, limit: int = 20, date: str = None, db: Session = Depends(get_db)):
    return crud.get_bookings(db, skip=skip, limit=limit, date=date)

@app.get("/bookings/{booking_id}", response_model=schemas.Booking)
def read_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

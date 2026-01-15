from sqlalchemy.orm import Session
from . import models, schemas


def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings(db: Session, skip: int = 0, limit: int = 20, date: str = None):
    query = db.query(models.Booking)
    if date:
        query = query.filter(models.Booking.date == date)
    return query.offset(skip).limit(limit).all()

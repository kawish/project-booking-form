from pydantic import BaseModel



class BookingBase(BaseModel):
    name: str
    date: str
    time: str
    guests: int
    requests: str = ""
    table_number: int

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int

    model_config = {"from_attributes": True}

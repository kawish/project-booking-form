import React, { useState } from "react";
import axios from "axios";
import { Button, message, Typography, Input, Table } from "antd";
import { API_BASE_URL } from "./constants";

const { Title } = Typography;

function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Failed to retrieve bookings. Please try again.");
    }
  };

  const fetchBookingById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/${bookingId}`);
      setBookings([response.data]);
    } catch (error) {
      console.error("Error fetching booking:", error);
      message.error("Failed to retrieve booking. Please try again.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Guests",
      dataIndex: "guests",
      key: "guests",
    },
    {
      title: "Table Number",
      dataIndex: "table_number",
      key: "table_number",
    },
  ];

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4}>Booking Details</Title>
      <Button type="primary" onClick={fetchBookings} style={{ marginBottom: 16 }}>
        Retrieve All Bookings
      </Button>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <Input
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          style={{ marginRight: 8, width: "300px" }}
        />
        <Button type="primary" onClick={fetchBookingById}>
          Retrieve Booking
        </Button>
      </div>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <Table dataSource={bookings} columns={columns} rowKey="id" />
      )}
    </div>
  );
}

export default BookingDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import "./TableStatus.css";
import { API_BASE_URL } from "./constants";

const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 13}:00`); // 13:00 to 22:00
const TABLES = [1, 2, 3, 4];

function TableStatus() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`${API_BASE_URL}/bookings?date=${selectedDate}`)
        .then((res) => {
          setBookings(res.data);
        });
    }
  }, [selectedDate]);

  // Build a map: { table: { hour: booked } }
  const statusMap = {};
  TABLES.forEach((table) => {
    statusMap[table] = {};
    HOURS.forEach((hour) => {
      statusMap[table][hour] = false;
    });
  });
  bookings.forEach((b) => {
    // Use the assigned table_number from booking
    let table = b.table_number;
    if (!TABLES.includes(table)) table = 1;
    statusMap[table][b.time] = true;
  });

  return (
    <div className="table-status">
      <h3>
        Table Status
        <DatePicker
          style={{ marginLeft: 16 }}
          onChange={(date) => setSelectedDate(date ? date.format("YYYY-MM-DD") : null)}
        />
      </h3>
      <table>
        <thead>
          <tr>
            <th>Table</th>
            {HOURS.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLES.map((table) => (
            <tr key={table}>
              <td>Table {table}</td>
              {HOURS.map((h) => (
                <td key={h} className={statusMap[table][h] ? "booked" : "available"}>
                  {statusMap[table][h] ? "Booked" : "Free"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableStatus;

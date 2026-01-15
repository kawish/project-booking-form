import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableStatus from "./TableStatus";
import BookingDetails from "./BookingDetails";
import MainMenu from "./MainMenu";
import { Form, Input, Button, InputNumber, DatePicker, TimePicker, Select, Row, Col, message, Typography, Card, Slider } from "antd";
import "antd/dist/reset.css";
import "./TableBooking.css";
import "./TableStatus.css";
import { API_BASE_URL } from "./constants";



const { Title } = Typography;
const { Option } = Select;

function TableBooking() {
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [dateKey, setDateKey] = useState('default');
  const TABLES = [1, 2, 3, 4];

  const fetchAvailableTables = async (date, time) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/?date=${date}`);
      const bookedSlots = response.data.filter(booking => booking.time === time).map(booking => booking.table_number);
      const available = TABLES.filter(table => !bookedSlots.includes(table));
      setAvailableTables(available);
    } catch (error) {
      console.error("Error fetching available tables:", error);
      message.error("Failed to fetch available tables. Please try again.");
    }
  };

  // Step 1: Collect details, then show available tables for selected time
  const onProceed = async (values) => {
    try {
      const isValidDate = values.date && typeof values.date.format === 'function';
      const isValidTime = values.time && typeof values.time.format === 'function';

      const formattedValues = {
        ...values,
        date: isValidDate ? values.date.format("YYYY-MM-DD") : null,
        time: isValidTime ? values.time.format("HH:mm") : null,
      };

      if (!formattedValues.date || !formattedValues.time) {
        throw new Error("Invalid date or time format");
      }

      setBookingData(formattedValues);
      await fetchAvailableTables(formattedValues.date, formattedValues.time);
      setStep(2);
    } catch (error) {
      console.error("Error in onProceed:", error);
      message.error("Failed to proceed. Please check your input.");
    }
  };

  const onBook = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings/`, {
        ...bookingData,
        table_number: selectedTable,
      });
      const updatedBookingData = { ...bookingData, id: response.data.id };
      setBookingData(updatedBookingData);
      message.success(`Booking successful! Your booking ID is ${response.data.id}`);
      setSubmitted(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      message.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="page">
      {/* HEADER / LOGO */}
      <header className="site-header">
        <div className="brand">
          <img className="brand__mark" src="/assets/Asset 14@4x.png" alt="Little Lemon logo" />
        </div>
      </header>

      {/* NAVIGATION */}
      <MainMenu />

      {/* 2-COLUMN LAYOUT */}
      <Row justify="center" align="top" gutter={32} style={{ marginTop: 32 }}>
        <Col xs={24} md={10}>
          <Card bordered className="booking-container">
            {submitted ? (
              <div className="booking-confirmation">
                <Title level={4}>Thank you for your booking!</Title>
                <p>Your booking ID is: <strong>{bookingData?.id || "N/A"}</strong></p>
                <Button type="primary" onClick={() => { setSubmitted(false); setStep(1); setSelectedTable(null); setBookingData(null); form.resetFields(); }}>Book Another</Button>
              </div>
            ) : (
              step === 1 ? (
                <>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onProceed}
                    initialValues={{ guests: 1 }}
                    onValuesChange={(_, allValues) => setFormValues(allValues)}
                  >
                  <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}> 
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    label="Date" 
                    name="date" 
                    rules={[{ required: true, message: 'Please select a date' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      disabledDate={current => current && current < new Date().setHours(0,0,0,0)}
                      onChange={val => {
                        if (val) {
                          setDateKey(val.format('YYYY-MM-DD'));
                        } else {
                          setDateKey('default');
                        }
                        form.setFieldsValue({ date: val, time: null });
                      }}
                    />
                  </Form.Item>
                  <Form.Item 
                    label="Time" 
                    name="time" 
                    dependencies={['date']}
                    rules={[{ required: true, message: 'Please select a time' }]}
                  >
                    <TimePicker
                      style={{ width: '100%' }}
                      format="HH:00"
                      minuteStep={60}
                      hourStep={1}
                      use12Hours={false}
                      hideDisabledOptions={true}
                      disabledHours={() => {
                        const date = form.getFieldValue('date');
                        const now = new Date();
                        // Always disable hours outside 13-22 (1pm-10pm)
                        const disabled = [];
                        for (let i = 0; i < 24; i++) {
                          if (i < 13 || i > 22) disabled.push(i);
                        }
                        if (!date) return disabled;
                        // Use dayjs if available, else fallback to Date
                        let jsDate;
                        if (date && typeof date.isValid === 'function') {
                          jsDate = date.isValid() && date.toDate ? date.toDate() : new Date(date);
                        } else if (date && date.toDate) {
                          jsDate = date.toDate();
                        } else if (date instanceof Date) {
                          jsDate = date;
                        } else {
                          jsDate = new Date(date);
                        }
                        if (
                          jsDate &&
                          jsDate.getFullYear() === now.getFullYear() &&
                          jsDate.getMonth() === now.getMonth() &&
                          jsDate.getDate() === now.getDate()
                        ) {
                          // Also disable current hour and all previous hours for today
                          for (let i = 13; i <= Math.min(now.getHours(), 22); i++) {
                            if (!disabled.includes(i)) disabled.push(i);
                          }
                        }
                        return disabled;
                      }}
                      disabledMinutes={selectedHour => {
                        const date = form.getFieldValue('date');
                        const now = new Date();
                        if (!date) return [];
                        let jsDate;
                        if (date && typeof date.isValid === 'function') {
                          jsDate = date.isValid() && date.toDate ? date.toDate() : new Date(date);
                        } else if (date && date.toDate) {
                          jsDate = date.toDate();
                        } else if (date instanceof Date) {
                          jsDate = date;
                        } else {
                          jsDate = new Date(date);
                        }
                        if (
                          jsDate &&
                          jsDate.getFullYear() === now.getFullYear() &&
                          jsDate.getMonth() === now.getMonth() &&
                          jsDate.getDate() === now.getDate() &&
                          selectedHour === now.getHours()
                        ) {
                          return Array.from({length: now.getMinutes()}, (_, i) => i);
                        }
                        return [];
                      }}
                      disabled={!form.getFieldValue('date')}
                    />
                  </Form.Item>
                  <Form.Item label="Number of Guests" name="guests" rules={[{ required: true, type: 'number', min: 1, max: 10 }]}> 
                    <Slider min={1} max={10} step={1} />
                  </Form.Item>
                  <Form.Item label="Occasion" name="occasion" rules={[{ required: true, message: 'Please select an occasion' }]}> 
                    <Select placeholder="Select occasion">
                      <Option value="Birthday">Birthday</Option>
                      <Option value="Anniversary">Anniversary</Option>
                      <Option value="Business Meeting">Business Meeting</Option>
                      <Option value="Engagement">Engagement</Option>
                      <Option value="Farewell">Farewell</Option>
                      <Option value="Baby Shower">Baby Shower</Option>
                      <Option value="Graduation">Graduation</Option>
                      <Option value="General Dining">General Dining</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Special Requests" name="requests"> <Input.TextArea rows={2} /> </Form.Item>
                  <Form.Item> <Button type="primary" htmlType="submit" block>Proceed</Button> </Form.Item>
                </Form>
                </>
              ) : (
                <div>
                  <Title level={4} style={{ marginBottom: 16 }}>Select an Available Table</Title>
                  <p><strong>Date:</strong> {bookingData?.date ? bookingData.date : "N/A"}</p>
                  <p><strong>Time:</strong> {bookingData?.time ? bookingData.time : "N/A"}</p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
                    {availableTables.length === 0 ? (
                      <span style={{ color: '#a00', fontWeight: 'bold' }}>No tables available for this time slot.</span>
                    ) : (
                      TABLES.map(table => {
                        const isAvailable = availableTables.includes(table);
                        const isSelected = selectedTable === table;
                        let background, color, border;
                        if (isAvailable) {
                          background = isSelected ? '#f4ce14' : '#e6ffe6'; // light green
                          color = isSelected ? '#495e57' : '#008000'; // green
                          border = isSelected ? '2px solid #495e57' : '1px solid #008000';
                        } else {
                          background = '#ffe6ea'; // light pink
                          color = '#d32f2f'; // red
                          border = '1px solid #d32f2f';
                        }
                        return (
                          <Button
                            key={table}
                            type={isSelected ? 'primary' : 'default'}
                            shape="round"
                            size="large"
                            disabled={!isAvailable}
                            style={{ minWidth: 100, background, color, border, fontWeight: 'bold' }}
                            onClick={() => isAvailable && setSelectedTable(table)}
                          >
                            Table {table}
                          </Button>
                        );
                      })
                    )}
                  </div>
                  <Button type="primary" block size="large" disabled={!selectedTable} onClick={onBook}>Book Table</Button>
                  <Button style={{ marginTop: 12 }} block onClick={() => { setStep(1); setSelectedTable(null); }}>Back</Button>
                </div>
              )
            )}
          </Card>
        </Col>
        <Col xs={24} md={14}>
          <BookingDetails />
        </Col>
      </Row>

      {/* Table Status Section */}
      <div style={{ marginTop: 32 }}>
        <TableStatus />
      </div>
    </div>
  );
}

export default TableBooking;

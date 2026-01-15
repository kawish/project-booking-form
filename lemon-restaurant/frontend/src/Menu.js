import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import "./Menu.css";
import MainMenu from "./MainMenu";

const { Title } = Typography;

const Menu = () => {
  const menuItems = [
    { name: "Pizza", price: "$12" },
    { name: "Pasta", price: "$10" },
    { name: "Salad", price: "$8" },
    { name: "Soup", price: "$6" },
  ];

  return (
    <div className="page">
      {/* HEADER / LOGO */}
      <header className="site-header">
        <div className="brand">
          <img className="brand__mark" src="/assets/Asset 14@4x.png" alt="Little Lemon logo" />
        </div>
      </header>
      <MainMenu />
      <div className="menu-content">
        <Title level={2} className="menu-title">Explore Our Delicious Menu</Title>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <Card key={index} className="menu-item" hoverable>
              <Title level={4} className="menu-item-title">{item.name}</Title>
              <p className="menu-item-price">{item.price}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
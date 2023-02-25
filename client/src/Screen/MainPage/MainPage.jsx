import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardPage from "../Dashboard/Dashboard";
import Invoice from "../Invoice/NewInvoice";
import NewCustomer from "../Customer/NewCustomer";
import MedicinePage from "../Medicine/MedicinePage";
import LogoutPage from "../LogoutPage/LogoutPage";
import PharmacistPage from "../Pharmacist/PharmacistPage";
import ReportsPage from "../ReportsPage/ReportsPage";
import DeliveryMenPage from "../DelvieryMenPage/DeliveryMenPage";
import SalesReportsPage from "../SalesReport/SalesReportPage";
import PurchasePage from "../PurchasePage/PurchasePage";
import SettingsPage from "../SettingsPage/Settings";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import {
  Dashboard,
  Receipt,
  Vaccines,
  LocalPharmacy,
  Flag,
  Logout,
  ShoppingBasket,
  People,
  DeliveryDining,
  AttachMoney,
  Settings,
} from "@mui/icons-material";

function MainPage(props) {
  const [option, setOption] = useState(0);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/logged-in").then((res) => {
      if (res.data.username === "") {
        navigate("/login");
      } else {
        setOption(() => res.data.lastAccessedScreen);
        setUser({
          username: res.data.username,
          role: res.data.role,
          lastAccessedScreen: res.data.lastAccessedScreen,
        });
        console.log(res.data.lastAccessedScreen);
        setOption(res.data.lastAccessedScreen);
      }
    });
  }, []);
  const changeOption = (e, value) => {
    e.preventDefault();
    setOption(value);
    updateLastAccessedScreen(e, value);
  };
  const updateLastAccessedScreen = (e, value) => {
    e.preventDefault();
    if (value === 11 || value === 10) {
      return;
    }

    axios
      .post("http://localhost:3000/update-last-accessed", {
        username: user.username,
        role: user.role,
        lastAccessedScreen: value,
      })
      .then((resp) => {
        //
      });
  };
  const menus = [
    { name: "Dashboard", menuValue: 1, icon: <Dashboard /> },
    { name: "Invoice", menuValue: 2, icon: <Receipt /> },
    { name: "Customer", menuValue: 3, icon: <People /> },
    { name: "Medicine", menuValue: 4, icon: <Vaccines /> },
    { name: "Pharmacist", menuValue: 5, icon: <LocalPharmacy /> },
    { name: "Delivery Men", menuValue: 6, icon: <DeliveryDining /> },
    { name: "Sales Report", menuValue: 7, icon: <AttachMoney /> },
    { name: "Purchase", menuValue: 8, icon: <ShoppingBasket /> },
    { name: "Reports", menuValue: 9, icon: <Flag /> },
    { name: "Settings", menuValue: 10, icon: <Settings /> },
    { name: "Logout", menuValue: 11, icon: <Logout /> },
  ];

  const contentArea = () => {
    switch (option) {
      case 1:
        return <DashboardPage />;
      case 2:
        return <Invoice />;
      case 3:
        return <NewCustomer />;
      case 4:
        return <MedicinePage />;
      case 5:
        return <PharmacistPage />;
      case 6:
        return <DeliveryMenPage />;
      case 7:
        return <SalesReportsPage />;
      case 8:
        return <PurchasePage username={user.username} />;
      case 9:
        return <ReportsPage />;
      case 10:
        return <SettingsPage username={user.username} />;
      case 11:
        return <LogoutPage />;
      default:
        return;
    }
  };
  return (
    <div>
      <div className="sticky-pharm">
        <Navbar username={user ? user.username : " "} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <div className="sticky-pharm-sidebar">
          <ListGroup
            style={{
              marginTop: "30px",
              boxShadow: "0 2px 5px rgb(0 0 0 / 0.2)",
            }}
          >
            {menus.map((menu) => (
              <ListGroup.Item
                className="sidebar-items"
                style={{
                  width: "250px",
                  color: option === menu.menuValue ? "purple" : "",
                  fontWeight: option === menu.menuValue ? "bold" : "",
                }}
              >
                <a
                  style={{
                    display: "flex",
                    gap: "10px",
                    margin: "8px 0 8px 0",
                  }}
                  onClick={(e) => changeOption(e, menu.menuValue)}
                >
                  <div>{menu.icon}</div>
                  <div>
                    <span>{menu.name}</span>
                  </div>
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div>
          <main
            style={{
              marginTop: "10px",
              marginLeft: "300px",
              padding: "20px 0 25px 20px",
            }}
            class="content"
          >
            {contentArea()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

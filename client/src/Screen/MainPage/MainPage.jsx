import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./styles.css";
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
import axios from "axios";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";
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

function MainPage() {
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
          lastAccessedScreen: option,
        });
      }
    });
  }, []);
  const changeOption = (e, value) => {
    e.preventDefault();
    updateLastAccessedScreen(value);
    setOption(() => value);
  };
  const updateLastAccessedScreen = (value) => {
    if (value === 11 || value === 10) {
      return;
    }
    setOption(() => value);
    axios
      .post("http://localhost:3000/update-last-accessed", user)
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
      <div>
        <a>
          <i>
            <h5>Pharmacy Management</h5>
          </i>
          <div>
            <Avatar sx={{ bgcolor: blue[500] }}>
              {user ? user.username[0].toUpperCase() : ""}
            </Avatar>
            Hello {user ? user.username : ""}
          </div>
        </a>

        <div class="sidebar">
          <ul>
            {menus.map((menu) => (
              <li style={{ marginLeft: "25px" }}>
                <a onClick={(e) => changeOption(e, menu.menuValue)}>
                  <div>{menu.icon}</div>
                  <div>
                    <em>{menu.name}</em>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <main class="content">{contentArea()}</main>
      </div>
    </div>
  );
}

export default MainPage;

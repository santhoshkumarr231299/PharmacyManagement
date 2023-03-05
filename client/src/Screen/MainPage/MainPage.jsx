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
import AssignUserPrevilegesPage from "../AssignUserPrevileges/AssignUserPrevileges";
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
  AdminPanelSettings,
} from "@mui/icons-material";

function MainPage(props) {
  const [option, setOption] = useState(0);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  const handleCloseLogout = () => {
    setLogout(false);
  };
  const handleOpenLogout = () => {
    setLogout(true);
  };

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
          haveAccessTo: res.data.haveAccessTo,
        });
        console.log(res.data.lastAccessedScreen);
        setOption(res.data.lastAccessedScreen);
      }
    });
  }, []);
  const changeOption = (e, value) => {
    e.preventDefault();
    if (value === 12) {
      handleOpenLogout();
      return;
    }
    setOption(value);
    updateLastAccessedScreen(e, value);
  };
  const updateLastAccessedScreen = (e, value) => {
    e.preventDefault();
    if (value === 12) {
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
    {
      name: "Dashboard",
      menuValue: 1,
      icon: <Dashboard />,
      haveAccess: user && user.haveAccessTo.includes("[1]"),
    },
    {
      name: "Invoice",
      menuValue: 2,
      icon: <Receipt />,
      haveAccess: user && user.haveAccessTo.includes("[2]"),
    },
    {
      name: "Customer",
      menuValue: 3,
      icon: <People />,
      haveAccess: user && user.haveAccessTo.includes("[3]"),
    },
    {
      name: "Medicine",
      menuValue: 4,
      icon: <Vaccines />,
      haveAccess: user && user.haveAccessTo.includes("[4]"),
    },
    {
      name: "Pharmacist",
      menuValue: 5,
      icon: <LocalPharmacy />,
      haveAccess: user && user.haveAccessTo.includes("[5]"),
    },
    {
      name: "Delivery Men",
      menuValue: 6,
      icon: <DeliveryDining />,
      haveAccess: user && user.haveAccessTo.includes("[6]"),
    },
    {
      name: "Sales Report",
      menuValue: 7,
      icon: <AttachMoney />,
      haveAccess: user && user.haveAccessTo.includes("[7]"),
    },
    {
      name: "Purchase",
      menuValue: 8,
      icon: <ShoppingBasket />,
      haveAccess: user && user.haveAccessTo.includes("[8]"),
    },
    {
      name: "Reports",
      menuValue: 9,
      icon: <Flag />,
      haveAccess: user && user.haveAccessTo.includes("[9]"),
    },
    {
      name: "Manage User Previleges",
      menuValue: 10,
      icon: <AdminPanelSettings />,
      haveAccess: user && user.haveAccessTo.includes("[10]"),
    },
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
        return <AssignUserPrevilegesPage />;
      case 11:
        return <SettingsPage username={user.username} />;
      default:
        return;
    }
  };
  return (
    <div>
      <div className="sticky-pharm">
        <Navbar
          username={user ? user.username : " "}
          changeOption={changeOption}
        />
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
            {menus.map(
              (menu) =>
                menu.haveAccess && (
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
                )
            )}
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
      {logout && (
        <LogoutPage open={handleOpenLogout} close={handleCloseLogout} />
      )}
    </div>
  );
}

export default MainPage;

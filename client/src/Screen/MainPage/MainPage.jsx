import React, { Component } from "react";
import "./styles.css";
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

class MainPage extends Component {
  state = {
    page: {
      option: this.props.mainCom.state.lastAccessedScreen,
    },
  };
  changeOption = (e, value) => {
    e.preventDefault();
    this.updateLastAccessedScreen(value);
    this.state.page.option = value;
    this.setState(this.state);
  };
  updateLastAccessedScreen = (value) => {
    if (value === 11 || value === 10) {
      return;
    }
    this.props.mainCom.state.user.lastAccessedScreen = value;
    axios
      .post(
        "http://localhost:3000/update-last-accessed",
        this.props.mainCom.state.user
      )
      .then((resp) => {
        //
      });
  };
  navBarStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };
  changeHoverNav = (val) => {
    this.setState({ hoverNav: val });
  };
  menus = [
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
  render() {
    const contentArea = () => {
      switch (this.state.page.option) {
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
          return <PurchasePage username={this.props.mainCom.state.username} />;
        case 9:
          return <ReportsPage />;
        case 10:
          return (
            <SettingsPage username={this.props.mainCom.state.user.username} />
          );
        case 11:
          return <LogoutPage />;
        default:
          return;
      }
    };
    return (
      <div>
        <div class="layout">
          <a
            class="header"
            href="#0"
            style={{
              fontFamily: "roboto",
              backgroundColor: "white",
              color: "black",
              textDecoration: "none",
            }}
          >
            <i class="fa">
              <h5>Pharmacy Management</h5>
            </i>
            <div style={this.navBarStyle}>
              <Avatar sx={{ bgcolor: blue[500] }}>
                {this.props.mainCom.state.user.username[0].toUpperCase()}
              </Avatar>
              Hello {this.props.mainCom.state.user.username}
            </div>
          </a>

          <div class="sidebar">
            <ul>
              {this.menus.map((menu) => (
                <li style={{ marginLeft: "25px" }}>
                  <a
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    class={
                      "sidebar-list-item" +
                      (this.state.page.option === menu.menuValue
                        ? " active"
                        : "")
                    }
                    onClick={(e) => this.changeOption(e, menu.menuValue)}
                    href="#0"
                  >
                    <div>{menu.icon}</div>
                    <div>
                      <em style={{ marginLeft: "-40px" }}>{menu.name}</em>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <main class="content" style={{ height: 550, width: 300 }}>
            {contentArea()}
          </main>
        </div>
      </div>
    );
  }
}

export default MainPage;

import React, { Component } from "react";
import "./styles.css";
import Dashboard from "../Dashboard/Dashboard";
import Invoice from "../Invoice/NewInvoice";
import NewCustomer from "../Customer/NewCustomer";
import MedicinePage from "../Medicine/MedicinePage";
import axios from "axios";

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
  render() {
    const contentArea = () => {
      switch (this.state.page.option) {
        case 1:
          return <Dashboard />;
        case 2:
          return <Invoice />;
        case 3:
          return <NewCustomer />;
        case 4:
          return <MedicinePage />;
        case 5:
          return;
        case 6:
          return;
        case 7:
          return;
        default:
          return;
      }
    };
    return (
      <div>
        <div class="layout">
          <a class="header" href="#0">
            <i class="fa">
              <h5>Pharmacy Management</h5>
            </i>
            <div class="header-user">
              <i class="fas fa-user-circle icon"></i>Hello{" "}
              {this.props.mainCom.state.user.username}
            </div>
          </a>

          <div class="sidebar">
            <ul>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 1 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 1)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-home icon"></i>
                  <em>Dashboard</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 2 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 2)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-user icon"></i>
                  <em>Invoice</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 3 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 3)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-tasks icon"></i>
                  <em>Customer</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 4 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 4)}
                  href="#0"
                >
                  {" "}
                  <i class={"fas fa-calendar icon"}></i>
                  <em>Medicine</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 5 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 5)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-toolbox icon"></i>
                  <em>Supplier</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 6 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 6)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-comments icon"></i>
                  <em>Purchase</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 7 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 7)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-lightbulb icon"></i>
                  <em>Report</em>
                </a>
              </li>
              <li>
                {" "}
                <a
                  class={
                    "sidebar-list-item" +
                    (this.state.page.option === 8 ? " active" : "")
                  }
                  onClick={(e) => this.changeOption(e, 8)}
                  href="#0"
                >
                  {" "}
                  <i class="fas fa-lock icon"></i>
                  <em>Logout</em>
                </a>
              </li>
            </ul>
          </div>

          <main class="content">
            <div class="main-header">{contentArea()}</div>
          </main>
        </div>
      </div>
    );
  }
}

export default MainPage;

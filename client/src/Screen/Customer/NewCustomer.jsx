import React, { Component } from "react";

class NewCustomer extends Component {
  state = {};
  render() {
    return (
      <div className="new-customer">
        <div class="main-title">
          <h1>New Customer</h1>
        </div>
        <div class="main-form">
          <form name="event">
            <input type="text" id="cname" placeholder="Name" />
            <input type="number" id="cnumber" placeholder="Phone Number" />
            <input type="text" id="clocation" placeholder="Location" />

            <div class="input-group">
              <input type="date" id="fdate" />
              <label for="fallday" class="all_day">
                All day:
              </label>
              <input type="checkbox" class="checkbox" id="fallday" />
            </div>

            <div class="input-hour">
              <div id="fhourdiv">
                <input type="time" id="fstart" class="hour" />
                <input type="time" id="fend" class="hour" />
              </div>
            </div>

            <input type="submit" id="fsubmit" value="Save" class="button" />
          </form>
        </div>
      </div>
    );
  }
}

export default NewCustomer;

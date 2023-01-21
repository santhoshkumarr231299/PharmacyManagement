import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="dashboard">
        <div class="main-title">
          <h1>New Event</h1>
        </div>
        <div class="main-form">
          <form name="event">
            <input type="text" id="ftitle" placeholder="Add title" />
            <input
              type="text"
              id="fdescription"
              placeholder="Add description"
            />
            <input type="text" id="flocation" placeholder="Add location" />

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

export default Dashboard;

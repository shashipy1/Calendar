import React from "react";

class EventForm extends React.Component {
    state = {
      title: '',
      date: this.props.data.date,
      startTime: this.props.data.startTime,
      endTime: this.props.data.endTime
    };
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
  
      // Extract the event details from the state
      const { title, date, startTime, endTime } = this.state;
  
      // Pass the event details back to the parent component
      this.props.onsubmit({
        title, date, startTime, endTime
      });
  
      // Clear the form and close the modal
      this.setState({
        title: '',
        date: null,
        startTime: null,
        endTime: null
      });
  
      this.props.onClose();
      console.log("finished event form...")
    };
  
    render() {
      const { title, date, startTime, endTime } = this.state;
      console.log("dateTime: ", [title, date, startTime, endTime])
  
      return (
        <div className="modal">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Event title"
              required
            />
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              required
            />
            <input
              type="time"
              name="startTime"
              value={startTime}
              onChange={this.handleChange}
              required
            />
            <input
              type="time"
              name="endTime"
              value={endTime}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Create Event</button>
            <button type="button" onClick={this.props.onClose}>Cancel</button>
          </form>
        </div>
      );
    }
  }
  
export default EventForm;
import React from "react";
import moment from "moment";
import "./Calendar.css"
import EventForm from "./EventForm";
import ModalCompo from "./Modal";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: moment(),
        events: [
          { id: 1, title: "Meeting", date: moment().format("YYYY-MM-DD"), startTime: "00:30", endTime: "01:45" },
          { id: 2, title: "Gym", date: moment().add(1, "days").format("YYYY-MM-DD"), startTime: "08:00", endTime: "09:30" },
        ],
        newEvent: { id: null, title: "", date: "", startTime: "", endTime: "" },
        
        isModalOpen: false,
        eventDetails: {
          title: '',
          date: null,
          startTime: null,
          endTime: null
        }
      };    
  }

  openModal = (day, hour) => {
    let hourSplit = hour.split(":")
    let hh = Number(hourSplit[0])+1
    if (hh < 10) { hh = `0${hh}`}
    let etime = `${hh}:${hourSplit[1]}`

    this.setState({
      isModalOpen: true,
      eventDetails: {title: "", date:day, startTime:hour, endTime:etime}
    });
    console.log("Opening modal ...", this.state.isModalOpen)
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  renderEventsForDayAndHour = (day, hour) => {
    const { events } = this.state;
    
    const filteredEvents = events.filter((event) => event.date === day && event.startTime.split(":")[0] === hour.split(":")[0]) // whether event will show or not: 

    return (
      <>
        {filteredEvents.map((event) => (
            <div key={event.id} className="event">
              {event.title}
              <button onClick={() => this.deleteEvent(event.id)}>Delete</button>
            </div>
          ))}
      </>
    );
  };
  
  createEvent = (event) => {
    const { events } = this.state;
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
    console.log("creating event...")
  
    const newEvent = {
      id: newId,
      title: event.title,
      date: event.date, 
      startTime: event.startTime, 
      endTime: event.endTime
    };
    console.log("newEvent", newEvent)
    
    this.setState({
      events: [...events, newEvent]
    });
    console.log("events", events)
  };  

  deleteEvent = (eventId) => {
    const { events } = this.state;
    const updatedEvents = events.filter((event) => event.id !== eventId);

    this.setState({
      events: updatedEvents,
    });
  };
  
  previousWeek = () => {
    this.setState({
      date: moment(this.state.date).subtract(1, 'week')
    });
  };
  
  nextWeek = () => {
    this.setState({
      date: moment(this.state.date).add(1, 'week')
    });
  };


  render() {
    const { date, isModalOpen, eventDetails } = this.state;
  
    // Render calendar days for the week
    const days = [];
    const startOfWeek = moment(date).startOf("week");
    
    for (let i = 0; i < 7; i++) {
      days.push(moment(startOfWeek).add(i, "days").format("YYYY-MM-DD"));
    }
  
    // Render hours
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = moment().startOf("day").add(i, "hours");
      hours.push(hour.format("HH:mm"));
    }

    console.log("this.state.isModalOpen", this.state.isModalOpen)
  
    return (
      <div className="calendar-container">
        <h1>Calendar</h1>
        <div className="calendar-header">
          <button onClick={this.previousWeek}>Previous Week</button>
          <span>{`${moment(startOfWeek).format("MMM D")} - ${moment(startOfWeek).add(6, "days").format("MMM D, YYYY")}`}</span>
          <button onClick={this.nextWeek}>Next Week</button>
        </div>

        {/* {isModalOpen && (<ModalCompo open={isModalOpen} closeModal={this.closeModal} />)} */}
        {isModalOpen && (<EventForm onsubmit={this.createEvent} onClose={this.closeModal} data={eventDetails} />)}

        <table className="calendar-table">
          <thead>
            <tr>
              <th></th> {/* Empty cell for spacing */}
              {days.map((day) => (
                <th key={day}>{moment(day).format("ddd, D")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td>{hour}</td>
                {days.map((day) => (
                  <td key={day} onClick={() => this.openModal(day, hour)}>
                    {this.renderEventsForDayAndHour(day, hour)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>        
      </div>
    );
  }  
}

  export default Calendar;

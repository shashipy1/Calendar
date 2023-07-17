import React from "react";
import moment from "moment";
import "./Calendar.css"
import EventForm from "./EventForm"

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {date: new Date()};
    this.state = {
        date: moment(),
        events: [
          { id: 1, title: "Meeting", date: moment().format("YYYY-MM-DD"), startTime: "00:30", endTime: "01:45" },
          { id: 2, title: "Gym", date: moment().add(1, "days").format("YYYY-MM-DD"), startTime: "", endTime: "" },
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

  // state = {
  //   date: moment(),
  //   events: [
  //     { id: 1, title: "Meeting", date: moment().format("YYYY-MM-DD") },
  //     { id: 2, title: "Gym", date: moment().add(1, "days").format("YYYY-MM-DD") },
  //   ],
  //   newEvent: { id: null, title: "", date: "" },
    
  //   isModalOpen: true,
  //   eventDetails: {
  //     title: '',
  //     startDateTime: null,
  //     endDateTime: null
  //   }
  // };

  openModal = () => {
    this.setState({
      isModalOpen: true
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
    console.log("events", events, day, hour)
    
    const filteredEvents = events.filter((event) => event.date === day) // whether event will show or not: 
    //  && moment(event.time).format('HH:mm') === hour
    console.log("filteredEvents", filteredEvents)

    return (
      <div>
        {filteredEvents.map((event) => (
            <div key={event.id} className="event">
              {event.title}
              <button onClick={() => this.deleteEvent(event.id)}>Delete</button>
            </div>
          ))}
      </div>
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
    events.push(newEvent)
    
    this.setState({
      events: [...events, newEvent]
    });
    console.log("events", events)
  };  
  

  handleTitleChange = (e) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        title: e.target.value,
      },
    });
  };

  handleDateChange = (e) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        date: e.target.value,
      },
    });
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
    const { date, events, newEvent, isModalOpen, eventDetails } = this.state;
  
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

        {this.state.isModalOpen && (<EventForm onSubmit={this.createEvent} onClose={this.closeModal} />)}

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
                  <td key={day} onClick={() => this.openModal()}>
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
  
  
//   renderEventsForDayAndHour = (day, hour) => {
//     const { events } = this.state;
  
//     return (
//       <div>
//         {events
//           .filter((event) => event.date === day && moment(event.time).format("HH:mm") === hour)
//           .map((event) => (
//             <div key={event.id} className="event">
//               {event.title}
//               <button onClick={() => this.deleteEvent(event.id)}>Delete</button>
//             </div>
//           ))}
//       </div>
//     );
//   };


  // addEvent = (e) => {
  //   e.preventDefault();

  //   const { events, newEvent } = this.state;

  //   if (newEvent.title && newEvent.date) {
  //     const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
  //     const newEvents = [
  //       ...events,
  //       { ...newEvent, id: newId },
  //     ];

  //     this.setState({
  //       events: newEvents,
  //       newEvent: { id: null, title: "", date: "" },
  //     });
  //   }
  // };

  
}

  export default Calendar;

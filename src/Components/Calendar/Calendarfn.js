import React, { useEffect, useState } from "react";
import moment from "moment";
import './calendar.css';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ModalComp from "../Modal/ModalComp";
import { useNavigate } from "react-router-dom";

const Calendarfn = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    modalTitle: "Create Event",
    title: "",
    date: null,
    startTime: null,
    endTime: null,
    description: null,
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }

    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }

    return () => {
      localStorage.removeItem("events");
    };
  }, []);

  const openModal = (day, hour, event = null) => {
    let hourSplit = hour.split(":");
    let hh = Number(hourSplit[0]) + 1;
    if (hh < 10) {
      hh = `0${hh}`;
    }
    let endTime = `${hh}:${hourSplit[1]}`;

    let mTitle = "";
    if (event === null) {
      console.log("if is running ...")
      mTitle = eventDetails.modalTitle;
      setEventDetails({
        modalTitle: mTitle,
        title: "",
        date: day,
        startTime: hour,
        endTime: endTime,
        description: "",
      });
    } else {
      mTitle = "Edit Event";
      console.log("else is running ...")
      setEventDetails({
        modalTitle: "Edit Event",
        id: event.id,
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventDetails({
      modalTitle: "Create Event",
    });
  };

  const renderEventsForDayAndHour = (day, hour) => {
    

    const filteredEvents = events.filter(
      (event) =>
        event.date === day && event.startTime.split(":")[0] === hour.split(":")[0]
    );

    return (
      <>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="event"
            onClick={(e) => {
              e.stopPropagation()
              openModal(day, hour, event)
            }}
          >
            {event.title}
          </div>
        ))}
      </>
    );
  };

  const createEvent = (event) => {
    console.log("event", event)
    if (event.eventId !== undefined) {
      let updatedData = {
      id: event.eventId,
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description
    }
      const eventIndex = events.findIndex((e) => e.id === event.eventId);
      if (eventIndex !== -1) {
        const updatedEvents = [...events];
        updatedEvents[eventIndex] = { ...updatedData };
        setEvents(updatedEvents);
      }
    }
    else {
      const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
      const newEvent = {
        id: newId,
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
      };
      setEvents([...events, newEvent]);
      localStorage.setItem("events", JSON.stringify([...events, newEvent]));
    }
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const previousWeek = () => {
    setDate(moment(date).subtract(1, "week"));
  };

  const nextWeek = () => {
    setDate(moment(date).add(1, "week"));
  };

  const days = [];
  const startOfWeek = moment(date).startOf("week");

  for (let i = 0; i < 7; i++) {
    days.push(moment(startOfWeek).add(i, "days").format("YYYY-MM-DD"));
  }

  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = moment().startOf("day").add(i, "hours");
    hours.push(hour.format("HH:mm"));
  }

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <h1>Calendar</h1>
          <button onClick={previousWeek}>
            <ArrowLeftIcon />
          </button>
          <span>{`${moment(startOfWeek).format(
            "MMM D"
          )} - ${moment(startOfWeek).add(6, "days").format("MMM D, YYYY")}`}</span>
          <button onClick={nextWeek}>
            <ArrowRightIcon />
          </button>
        </div>
        {isModalOpen && (
          <ModalComp
            open={isModalOpen}
            closeModal={closeModal}
            handleDelete={deleteEvent}
            data={eventDetails}
            onsubmit={createEvent}
          />
        )}

        <table className="calendar-table">
          <thead>
            <tr>
              <th></th>
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
                  <td key={day} onClick={() => openModal(day, hour)}>
                    {renderEventsForDayAndHour(day, hour)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendarfn;

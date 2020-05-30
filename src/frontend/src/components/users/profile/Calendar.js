import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
class CalendarPage extends Component {
  render() {
    return (
      <Calendar  calendarType="US" value={new Date()} />
    );
  }
}
 
export default CalendarPage;

import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { CalendarGrid, CalendarDay, CalendarHeader } from './index';
import axios from 'axios';

const Calendar = () => {
  const loadUserSettings = () => {
    const localMonth = localStorage.getItem('localMonth');
    const localYear = localStorage.getItem('localYear');

    const userMonth = localMonth ? +localMonth : (new Date()).getMonth();
    const userYear = localYear ? +localYear : (new Date()).getFullYear();

    return { userMonth, userYear };
  }

  const { userMonth, userYear } = loadUserSettings();
  const [currentDate, setCurrentDate] = useState((new Date(userYear, userMonth)));
  const [currentYear, setCurrentYear] = useState(userYear);
  const [currentMonth, setCurrentMonth] = useState(userMonth);
  const [daysOfMonth, setDaysOfMonth] = useState([]);
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('userAppointments');
    return savedAppointments ? JSON.parse(savedAppointments) : {};
  });
  const [cloudAppointments, setCloudAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createCalendarDays();
    localStorage.setItem('localMonth', currentMonth);
    localStorage.setItem('localYear', currentYear);
    localStorage.setItem('userAppointments', JSON.stringify(appointments));
    console.log(appointments);

  }, [currentDate, currentMonth, currentYear, appointments]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://altomobile.blob.core.windows.net/api/test.json');
        setCloudAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createAppointment = (day, month) => {
    const title = window.prompt('Add title for new appointment: ', '');
    if (title) {
      let key = '';
      switch (month) {
        case 'prev': key = currentMonth === 0 ? `${currentYear - 1}-${12}-${day}` : `${currentYear}-${currentMonth}-${day}`; break;
        case 'current': key = `${currentYear}-${currentMonth + 1}-${day}`; break;
        case 'next': key = currentMonth === 11 ? `${currentYear + 1}-${1}-${day}` : `${currentYear}-${currentMonth + 2}-${day}`; break;
        default: break;
      }
      setAppointments((prevAppointments) => {
        const newAppointments = { ...prevAppointments };
        if (newAppointments[key]) {
          if (!newAppointments[key].includes(title)) {
            newAppointments[key].push(title);
          }
        } else {
          newAppointments[key] = [title];
        }
        return newAppointments;
      });
    }
  }

  const createCalendarDays = () => {
    const today = new Date();
    const isCurrentDateToday = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    const firstDay = monthStart.getDay();
    const monthDays = monthEnd.getDate();
    const prevMonthEnd = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonthEnd.getDate();
    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const key = currentMonth === 0 ? `${currentYear - 1}-${12}-${day}` : `${currentYear}-${currentMonth}-${day}`;
      days.push(
        <CalendarDay key={`prev-${day}`} dayKey={key} day={day} createAppointment={createAppointment} month={'prev'} appointments={appointments} deleteAppointment={deleteAppointment} />
      );
    }

    for (let i = 1; i <= monthDays; i++) {
      const isToday = isCurrentDateToday && today.getDate() === i;
      const key = `${currentYear}-${currentMonth + 1}-${i}`;
      days.push(
        <CalendarDay key={`day-${i}`} inMonth dayKey={key} day={i} isToday={isToday} createAppointment={createAppointment} month={'current'} appointments={appointments} deleteAppointment={deleteAppointment} />
      );
    }

    const totalDays = firstDay + monthDays;
    const nextMonthDaysToShow = 7 - (totalDays % 7);
    if (nextMonthDaysToShow < 7) {
      for (let i = 1; i <= nextMonthDaysToShow; i++) {
        const key = currentMonth === 11 ? `${currentYear + 1}-${1}-${i}` : `${currentYear}-${currentMonth + 2}-${i}`;
        days.push(
          <CalendarDay key={`next-${i}`} dayKey={key} day={i} createAppointment={createAppointment} month={'next'} appointments={appointments} deleteAppointment={deleteAppointment} />
        );
      }
    }

    setDaysOfMonth(days);
  };

  const handleBackMonth = () => {
    let newDate = new Date(currentDate);
    if (currentDate.getMonth() === 0) {
      newDate.setFullYear(currentDate.getFullYear() - 1);
      newDate.setMonth(11);
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
      setCurrentMonth(currentMonth - 1);
    }
    setCurrentDate(newDate);
  }

  const handleNextMonth = () => {
    let newDate = new Date(currentDate);
    if (currentDate.getMonth() === 11) {
      newDate.setFullYear(currentDate.getFullYear() + 1);
      newDate.setMonth(0);
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
      setCurrentMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  }

  const deleteAppointment = (key, index) => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };

      if (updatedAppointments[key]) {
        updatedAppointments[key].splice(index, 1);

        if (updatedAppointments[key].length === 0) {
          delete updatedAppointments[key];
        }
      }

      localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });
  }

  return (
    <Grid container direction={'column'} spacing={2} padding={4}>
      <Grid item xs={1}>
        <CalendarHeader handleBackMonth={handleBackMonth} handleNextMonth={handleNextMonth} currentMonth={currentMonth} currentYear={currentYear} appointments={appointments} cloudAppointments={cloudAppointments} loading={loading} deleteAppointment={deleteAppointment} />
      </Grid>
      <Grid item xs={11}>
        <CalendarGrid daysOfMonth={daysOfMonth} />
      </Grid>
    </Grid>
  )
}

export default Calendar;
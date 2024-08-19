
import { Avatar, Card, Chip, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Cancel as CancelIcon } from '@mui/icons-material';
import { AppointmentsGrid } from './index'

const CalendarDay = ({ dayKey, day, isToday, createAppointment, month, appointments, deleteAppointment }) => {
  const [dayAppointments, setDayAppointments] = useState(appointments[dayKey] ?? []);

  useEffect(() => {
    setDayAppointments(appointments[dayKey]);
  }, [dayKey])

  return (
    <Grid item xs={1} onDoubleClick={() => createAppointment(day, month)}>
      <Card>
        <Grid container minHeight={"15vh"} maxHeight={"15vh"} >
          <Grid item xs={12} padding={1} maxHeight={"3vh"} minHeight={"3vh"}>
            {isToday || month !== 'current' ?
              <Grid container display={"flex"} justifyContent={"flex-end"} >
                <Grid item>
                  <Avatar sx={{ width: 25, height: 25 }} style={isToday ? { backgroundColor: "#1e88e5" } : {}}>
                    <Typography variant={"subtitle2"} sx={isToday ? { fontWeight: 'bold', color: "white" } : month === 'current' ? {} : { color: "white" }} display={"flex"} justifyContent={"flex-end"}>{day}</Typography>
                  </Avatar>
                </Grid>
              </Grid>
              :
              <Typography variant={"subtitle2"} sx={isToday ? { fontWeight: 'bold', color: 'blue' } : month === 'current' ? {} : { color: 'gray' }} display={"flex"} justifyContent={"flex-end"}>{day}</Typography>
            }

          </Grid>
          <AppointmentsGrid item xs={12} padding={1}>
            <Grid container spacing={1}>
              {
                dayAppointments?.length > 0 ? dayAppointments.map((appointment, index) => {
                  return (
                    <Grid key={index} item xs={12}>
                      <Grid container>
                        <Grid item xs={10} display={"flex"} alignItems={"center"}>
                          <Tooltip title={appointment}>
                            <Chip label={appointment} sx={{ width: "100%", height: "80%" }} color="info" />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={2} display={"flex"} >
                          <Tooltip title={"Delete appointment"}>
                            <CancelIcon color="info" onClick={() => deleteAppointment(dayKey, index)}  fontSize="small"/>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }) : <></>
              }
            </Grid>
          </AppointmentsGrid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default CalendarDay;
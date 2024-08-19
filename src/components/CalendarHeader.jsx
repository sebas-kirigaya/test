import { Grid, Button, Typography, Drawer, Box, List, ListItem, ListItemText, Divider, CircularProgress, ListItemIcon, Tooltip } from "@mui/material";
import { EventNote as EventNoteIcon, InsertInvitation as InsertInvitationIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from "react";

const CalendarHeader = ({ handleBackMonth, handleNextMonth, currentMonth, currentYear, appointments, cloudAppointments, loading, deleteAppointment }) => {
  const [showAppointments, setShowAppointments] = useState(false);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Grid container>
      <Grid item xs={3}>
        <Button onClick={() => handleBackMonth()} sx={{ color: "black" }}>Back</Button>
        <Button onClick={() => handleNextMonth()} sx={{ color: "black" }}> Next</Button>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={6} justifyContent={'flex-end'} display={'flex'}>
            <Typography variant="h6">{currentYear}</Typography>
          </Grid>
          <Grid item xs={6} alignItems={'flex-start'}>
            <Typography variant="h6">{months[currentMonth]}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} display={'flex'} justifyContent={'flex-end'}>
        {loading ? <CircularProgress /> :
          <Button onClick={() => setShowAppointments(!showAppointments)} startIcon={<EventNoteIcon />} sx={{ color: "black" }}>
            Appointments
          </Button>
        }
        <Drawer open={showAppointments} onClose={() => setShowAppointments(!showAppointments)} anchor="right">
          <Box paddingX={3}>
            <Typography variant="h6" sx={{ paddingTop: 1 }}> Cloud appointments</Typography>
            <List>
              {cloudAppointments.map(({ time, name }, index) => {
                const date = new Date(time);
                const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                return (
                  <>
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <InsertInvitationIcon />
                      </ListItemIcon>
                      <ListItemText primary={name} secondary={formatDate} />
                    </ListItem>
                    <Divider />
                  </>
                )
              })}
            </List>
            <Typography variant="h6" sx={{ paddingTop: 2 }}> Local appointments</Typography>
            <List>
              {Object.entries(appointments).map(([key, value]) => {
                const date = new Date(key);
                const formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
                return value.map((appointment, index) => {
                  return (
                    <>
                      <ListItem key={index} disablePadding>
                        <ListItemIcon>
                          <InsertInvitationIcon />
                        </ListItemIcon>
                        <ListItemText primary={appointment} secondary={formatDate} />
                        <ListItemIcon>
                          <Tooltip title={"Delete appointment"}>
                            <DeleteIcon onClick={() => deleteAppointment(formatDate, index)} />
                          </Tooltip>
                        </ListItemIcon>
                      </ListItem>
                      <Divider />
                    </>
                  )
                })
              })}
            </List>
          </Box>
        </Drawer>
      </Grid>
    </Grid>
  )
}

export default CalendarHeader;
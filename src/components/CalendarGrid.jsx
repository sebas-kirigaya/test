import { Grid, Typography } from "@mui/material";

const CalendarGrid = ({ daysOfMonth }) => {

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Grid container direction={"column"}>
      <Grid item xs={2}>
        <Grid container columns={7}>
          {daysOfWeek.map((day) => {
            return (
              <Grid key={`dayofweek-${day}`} item xs={1}>
                <Typography variant="subtitle1" justifyContent={"center"} display={"flex"}>{day}</Typography>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container columns={7} spacing={1}>
          {daysOfMonth.map(day => {
            return day
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CalendarGrid;
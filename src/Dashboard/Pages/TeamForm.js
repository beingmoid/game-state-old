import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import {InputLabel,Select, MenuItem} from '@material-ui/core'
class TeamForm extends Component {

    render()
    {
        return (<React.Fragment>
            <Typography variant="h6" gutterBottom>
        Team
      </Typography>
      <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="TeamName"
            name="TeamName"
            label="Team Name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel>Team Type</InputLabel>
        <Select fullWidth
        >
          <MenuItem value={10}>CSGO</MenuItem>
          <MenuItem value={20}>DOTA2</MenuItem>
         
        </Select>
        </Grid>
     
      
      </Grid>
      </Container>
        </React.Fragment>)
    }
}
export default TeamForm;
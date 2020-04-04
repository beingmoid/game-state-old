
import React,{Component} from 'react';
import {Grid,Card,CardContent,CardActionArea,Typography,CardMedia,CardActions,Button} from '@material-ui/core';
import logo from './bg.jpg'; 
class TeamProfile extends Component {
    render()
    {
        return(<div>

            <Grid container spacing={3}>
            <Grid item xs={6}>
            <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image= {logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            CSGO
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Connect CSGO with your Steam Account
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        Connect
        </Button>
     
      </CardActions>
    </Card>
    </Grid>
    </Grid>
        </div>);
    }

}
export default TeamProfile;
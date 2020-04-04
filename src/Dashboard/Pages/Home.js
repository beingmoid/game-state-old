import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './bg.jpg'; 

const useStyles = makeStyles(theme => ({
  // card: {
  //   maxWidth: 400,
  // },
}));

function Home()
{
    const classes = useStyles();
    return(<div>
        <Grid container spacing={3}>
            <Grid item xs={6}>
            <Card className={classes.card}>
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
            <Grid item xs={6}>
            <Card className={classes.card}>
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
           DOTA 2
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Connect DOTA 2 with your Steam Account
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

export default Home;
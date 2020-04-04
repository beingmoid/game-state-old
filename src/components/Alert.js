import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { positions } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      
    },
    positions:"absolute",
    top:'100%',
    left:'50%'
  },
}));

export default function ColorAlerts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={props.severity} variant="filled" action={props.action} >
       {props.msg}
      </Alert>
    </div>
  );
}
import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel,TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import {myConfig} from '../Configuration/config';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Register(props) {
	const { classes } = props
	
	const [isValid, setIsValid] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [formError,setFormError]=useState(false);
	const [errorMsg , setErrorMsg]=useState('');
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
	  setOpen(true);
	};
  
	const handleClose = (event, reason) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
	  setOpen(false);
	};

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
					
						<TextField id="name" name="name" autoComplete="off" label="Full name" variant="outlined"  autoFocus value={name} onChange={e => setName(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
					
						<TextField error={isValid} id="username" label="Username" helperText="Error" variant="outlined" name="username" autoComplete="off"  onChange={async (e) => {
							setUsername(e.target.value);
							await fetch(myConfig.BASEURL+`User/${e.target.value}`,{
			method:'GET',
			headers:{'Content-Type': 'application/json'
		   }}).then(res=>res.json())
		  .then((myJson) => {
				if(myJson==null)
				{
					console.log(true);
					setIsValid(false);
				}
				else
				{
					console.log(false);
					setIsValid(false);
				}
			//var m = myJson
		  });
							
							} } />
					
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						
						<TextField id="email" name="email" label="Email Address" variant="outlined" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						
						<TextField name="password" label="Password" variant="outlined" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
					
						<TextField error={password!==password2} name="password2" label="Re Enter Password" variant="outlined" type="password" id="password2" autoComplete="off" onChange={e=> setPassword2(e.target.value)}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onSubmit}
						className={classes.submit}>
						Register
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Go back to Login
          			</Button>
				</form>
			</Paper>
			<Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={errorMsg}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              OK
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
		}/>




		</main>
	)
		
		async function onSubmit()
		{
			await onRegister();
			if(formError)
			{
				
			}

		}
	async function onRegister() {
		const response= fetch(myConfig.BASEURL+`Player/Add`,{
			method:'POST',
			headers:{'Content-Type': 'application/json',
			// 'Access-Control-Allow-Origin': 'http://localhost:3000',
			// 'Access-Control-Allow-Credentials': 'true'
		   },
		
		   body:JSON.stringify({Id:username,Password:password,Email:email})
		}).then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			if(myJson.statusCode!==undefined)
			{

				setFormError(true);
				if(myJson.errors[0].InnerException!==undefined)
				{
					setErrorMsg(myJson.errors[0].InnerException.Message)
					console.log(myJson.statusCode);
					setOpen(true)
				}
				else
				{
					setErrorMsg(myJson.errors[0]);
					console.log(myJson.errors[0]);
					setOpen(true)
				}
			}
			if(myJson.item1!==undefined)
			{
				window.location='/login';
			}
		
			console.log();
		  });
		  return response;
	}
}

export default withRouter(withStyles(styles)(Register))

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Card, CardHeader } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from './bg.jpg'; 
import {InputLabel,Select, MenuItem,Divider,Slide,IconButton,Collapse} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, {  useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {myConfig} from '../../Configuration/config';
import {Grid,TableContainer ,Table ,TableHead,TableRow,TableBody,TableCell} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import GoogleMaps from './GoogleMaps';
import MatchRequest from './MatchRequest';
import matchroom from './matchroom.jpg';
import ColorAlerts from '../../components/Alert';

const useStyles = makeStyles(theme => ({
      appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      dialog:{
        backgroundImage: matchroom,
        color:'black',
        fontFamily:'Open Sans',
        fontSize:100,
        
  
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      alert:{
        width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      
    },
    positions:"absolute",
    top:'100%',
    left:'50%'
      }
    }));
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [openMatchDialog, setMatchDialog] = React.useState(false);
  const [TeamSearch,setTeamSearch]= React.useState([]); 
  const [SelectedTeam,setSelectedTeam]= React.useState(null);
  const [name,setName]=React.useState('');
  const [type,setType]=React.useState(0);
  const [IsSuccess, setISuccess]=React.useState(null);
  const [Teams,SetTeams]=React.useState([]);
  const [options,setOptions]=React.useState([]);
  const [player,setPlayer]=React.useState('');
  const [teamId, setTeamId]=React.useState(0);
  const [location,setLocation]=React.useState('');
  const [contact,setContact]=React.useState('');
  const [request,setRequest]=React.useState([]);
  const [reqDialog,setReqDialog]=React.useState(false);
  const [AcceptedRequest,SetAcceptedRequest]=React.useState([]);
  const [matchRoom,setMatchroomDialog] = React.useState(false);
  const [playerValidator,setPlayerValidator] = React.useState(false);
  const [slideTimer,setTimer]=React.useState(false);
  const [gameState,setGameState]=React.useState({});
   const classes = useStyles();

 const  handleCloseMatchroomDialog= ()=>
   {
     setMatchroomDialog(false);
   }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = (e) => {
    setOpen2(true);
    console.log(e)
    setTeamId(e)
  };

  const handleClose2 = () =>{
    setOpen2(false);
  }
  const handleClickOpen3 = (e) => {
    setOpen3(true);
    console.log(e)
    setTeamId(e)
  };


  const handleMatchOpen = (e) => {
    setMatchDialog(true);
    GetReceivedRequest(e);
   
  };
  const HandleMatchRoomOpen = (e)=>{
    console.log(e);
    GetCurrentMatch(e);
    setMatchroomDialog(true);
  }
 
  const  handleCloseMatch = (e) => {
    setMatchDialog(false);
    console.log(e)
  };
 
  const handleClose3 = () =>{
    setOpen3(false);
  }
 
  const handleReqDialog = (e) => {
    
     setTeamId(parseInt(e));
     console.log(teamId);
     setReqDialog(true);
     Request(e);
    // console.log(e);
   
  };
  const  handleCloseReqDialog = (e) => {
    setReqDialog(false);
    console.log(e)
    setTeamId(e)
  };

  async function Request(e){
    fetch(myConfig.BASEURL+'MatchRequest/AcceptedRequest?teamId='+e,myConfig.GET)
    .then(res=> res.json())
    .then((res)=>{
      SetAcceptedRequest(res)
      console.log(res)});
    
}
  async function CreateTeam()
  {
    
      const request = {
        method:'POST',
        headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),

       body:JSON.stringify({TeamName:name,TeamType:type})
    };
    console.log(request);

    const response= fetch(myConfig.BASEURL+'Team/',{
        method:'POST',
        headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
       body:JSON.stringify({TeamName:name,TeamType:type})
    }).then((response) => {
        
        return response.json();
      })
      .then((myJson) => {
          if(myJson!=null)
          { 
            setOpen(false);
            setISuccess(true);
            GetTeams();
          }
     console.log(myJson);
      });
      return response;
     
  }
  async function GetReceivedRequest(e)
    {
    
        fetch(myConfig.BASEURL+`Team/GetRequestReceived?teamId=${e}`,myConfig.GET)
        .then((res)=>res.json())
        .then((res)=>setRequest(res));

        return false;

    }
 
  async function AddPlayers(e)
  {
   e.preventDefault();
    console.log(JSON.stringify({teamId:teamId,PlayerId:player}));
    const response= fetch(myConfig.BASEURL+'TeamPlayers/',{
      method:'POST',
      headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
     body:JSON.stringify({teamId:teamId,PlayerId:player})
  }).then((response) => {
      
      return response.json();
    })
    .then((myJson) => {
    // console.log(myJson,IsSuccess);
      
        if(myJson.errors===undefined)
        { 
          setOpen2(false);
          setISuccess(true);
        }
        else{
          setOpen2(false);
          setPlayerValidator(true);
          setTimer(true);
        }
 
    })
    .catch(ex =>{
      console.log(ex);
    })
    
    ;

    // response.catch(err => console.log(err));
    
    
return response;
  }
  async function GetTeams()
  {
      await fetch(myConfig.BASEURL+`TeamPlayers/GetTeams`,{
        method:'GET',
        headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
      }).then((response) => {
        
        return response.json();
      })
      .then((myJson) => {

        
        SetTeams(myJson);
     console.log(myJson);
     return myJson
      });
  }
  async function Accepted(e)
{
   await fetch(myConfig.BASEURL+'MatchRequest/IsAccepted?Id='+e+'&value='+'true',myConfig.GET)
    .then(res=>res.json())
    .then((res)=>{
         console.log(res);
    
    })

}
async function BeginMatch(Team1,Team2,reqId)
{
  console.log(Team1,Team2,reqId)
  fetch(myConfig.BASEURL+'Match/BeginMatch?', {
    method:'POST',
    headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
    body: JSON.stringify({
      TeamId:Team1,
      TeamId2:Team2,
      MatchRequestId:reqId
    })
  })
  .then(res=> res.json())
  .then((res)=> {
    console.log(res)
    sessionStorage.setItem('match',JSON.stringify(res));
   
  });
  ActivateMatch();
}
async function Rejected(e)
{
  await fetch(myConfig.BASEURL+'MatchRequest/IsAccepted?Id='+e+'&value='+'false',myConfig.GET)
    .then(res=>res.json())
    .then((res)=>{
         console.log(res);

}        )
}
  async function GetPlayers(value)
  {
    await fetch(myConfig.BASEURL+`Player/FilterList?searchValue=${value}`,{
      method:'GET',
      headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
    }).then((response) => {
      
      return response.json();
    })
    .then((myJson) => {
     setOptions(myJson);
    return myJson
    });
  }
  function onChangeHandler(e){
   GetPlayers(e.target.value)
    setPlayer(e.target.value)
   //  console.log(e);
  }

  async function GetTeamList(e)
  {
    await fetch(myConfig.BASEURL+'Team/TeamSearch?searchVal='+e.target.value+'&ownId='+teamId,myConfig.GET)
    .then((res)=> res.json())
    .then((res)=>{
      setTeamSearch(res)
     
    })

  }

 async function SendMatchRequest()
  {
    await fetch(myConfig.BASEURL+'MatchRequest',{
      method:'POST',
      headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
      body:JSON.stringify({senderTeamId:teamId,receiverTeamId:SelectedTeam,IsAccepted:false,Longitude:0.0,contact1:contact,contact2:location})
    }).then((res)=> res.json())
    .then((res)=>console.log(res));

  }

  function onPlayerHandler(e)
  {
    // setPlayer(e.target.value);
   // console.log(e);
  }

  async function GetCurrentMatch(e)
  {
   
    if (e!==null)
    {
    const response=  await fetch(myConfig.BASEURL+'Match/CurrentMatch?teamId='+e,myConfig.GET)
    .then(res=> res.json())
    .then((res)=>{
      setGameState(res);
      console.log(gameState);
    } );
    }
    else
    {
    const  response=  await fetch(myConfig.GET+"Match/CurrentMatch?teamId="+teamId,myConfig.GET)
    .then(res=> res.json())
    .then((res)=>{
      setGameState(res);
      console.log(gameState);
    } );    }
     
  }
  function ActivateMatch()
  {
    const matchId = JSON.parse(sessionStorage.getItem('match'));
    if(matchId !== undefined)
  {
    fetch(myConfig.GAMESTATE_URL+"Activate?matchId="+Object.keys(matchId.item1)[0],{
      method:'GET',
    'Content-Type': 'application/json',

    }).then(res=> res.ok)
    .then(res=> console.log(res));
  }

    // fetch(myConfig.GAMESTATE_URL+"ActivateMatch?matchId=")
  }
  useEffect(()=>{
    GetTeams()
    GetPlayers()
  },[])
  return (
    <div>
        <Card className={classes.card} >
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
          Team
          </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
         Create your own team and add members.
           </Typography>
         </CardContent>
       </CardActionArea>
      <CardActions>
        <Button size="small"  color="primary" onClick={handleClickOpen}>
         Create Team
         </Button>
       </CardActions>
     </Card>
     <Grid container>
      {
Teams.map(function(item,i){return( 
<div>
<Card className={classes.card} key={i} >
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
          {item.teamName}
          </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
         View your teams and edit also add members
           </Typography>
         </CardContent>
       </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>{handleClickOpen2(item.id)}}>
         Add Players
         </Button>
         <Button size="small" color="primary" onClick={()=>{handleClickOpen3(item.id)}}>
         Play Match
         </Button>
         <Button size="small" color="primary" onClick={()=>{handleMatchOpen(item.id);
        
     
        }}>
         Match Request
         </Button>

         <Button size="small" color="primary" onClick={()=>{handleReqDialog(item.id);
        }}>
         View Request
         </Button>

         <Button size="small" color="primary" onClick={()=>{HandleMatchRoomOpen(item.id);
        }}>
         Current Match
         </Button>
       </CardActions>
     </Card>
</div>)})
      }

{playerValidator?<Collapse className={classes.alert} in={slideTimer}><ColorAlerts color="info" msg={"Player in this team Already Exisit!"} severity={"error"} action={
  <IconButton
  aria-label="close"
  color="inherit"
  size="small"
  onClick={() => {
    setTimer(false);
  }}
>
  <CloseIcon />
</IconButton> 
}>

</ColorAlerts> </Collapse>:
<Collapse className={classes.alert} in={slideTimer}><ColorAlerts color="info" msg={"Player in this team Already Exisit!"} severity={"success"} action={
  <IconButton
  aria-label="close"
  color="inherit"
  size="small"
  onClick={() => {
    setTimer(false);
  }}
>
  <CloseIcon />
</IconButton> 
}>

</ColorAlerts> </Collapse>}
     </Grid>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" key={"Team"}>
        <DialogTitle id="form-dialog-title">Create new Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new team, please enter name and type of game here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="TeamName"
            label="Team name"
            type="email"
            fullWidth
            onChange={(e)=> setName(e.target.value)}
          />
          <Divider/>
          <InputLabel>Team Type</InputLabel>
        <Select fullWidth onChange={(e)=> setType(e.target.value)}
        >
          <MenuItem value={1}>CSGO</MenuItem>
          <MenuItem value={2}>DOTA2</MenuItem>
        </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={CreateTeam} color="primary">
            Create
          </Button>
         
        </DialogActions>
      </Dialog>
    
      <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" key={"player"}>
        <DialogTitle id="form-dialog-title">Create new Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new team, please enter name and type of game here.
          </DialogContentText>
        

          <Autocomplete
        id="Playerusername"
        freeSolo
        options={options.map(option => option.id)}
        onChange={(e,value)=>{
          setPlayer(value);
        }}
        renderInput={params => (
          <TextField {...params} label="Player name" value={player} margin="normal" variant="outlined" fullWidth   onChange={(e)=> onChangeHandler(e)} onSelect={(e)=>onPlayerHandler(e)}   />
        )}
      />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={(e)=> AddPlayers(e)} color="primary">
           Add
          </Button>
         
        </DialogActions>
      </Dialog>



      <Dialog open={open3} onClose={handleClose3} aria-labelledby="form-dialog-title" key={"Team Request"}>
        <DialogTitle id="form-dialog-title">Send Match Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Search team and send Match request
          </DialogContentText>
        

          <Autocomplete
        id="Playerusername"
        freeSolo
        options={TeamSearch.map(option => option.teamName)}
        onChange={async(e,value)=>{
          var Id = TeamSearch.filter(x=>x.teamName==value);
          console.log(Id[0].id);
         await setSelectedTeam(Id[0].id);
        }}
        renderInput={params => (
          <TextField {...params} label="Team name" value={player} margin="normal" variant="outlined" fullWidth   onChange={async (e)=> await GetTeamList(e)}  />
        )}
      />

      <TextField label="Location" margin="normal" variant="outlined" fullWidth onChange={(e)=>{
        console.log(e.target.value)
        setLocation(e.target.value)
      }}  > </TextField>

      <TextField label="Contact Number" margin="normal" variant="outlined" fullWidth onChange={(e)=>{
         console.log(e.target.value)
        setContact(e.target.value)
      }}  > </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={(e)=> {
            e.preventDefault();
            SendMatchRequest();}} color="primary">
           Send Request
          </Button>
         
        </DialogActions>
      </Dialog>
            {/* <MatchRequest openMatchDialog={openMatchDialog} handleCloseMatch={(e)=>handleCloseMatch(false)} teamId={teamId} Accepted={Accepted} Rejected={Rejected}  ></MatchRequest> */}



            <Dialog open={openMatchDialog} onClose={handleCloseMatch} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Challenges</DialogTitle>
        <DialogContent>
          <DialogContentText>
        Accept or Reject Challenges
          </DialogContentText>

        <Grid container spacing={3}>

        <Grid item xs={12}>

            <TableContainer component={Paper}>
                <Table color="primary">
                    <TableHead>
                        <TableRow>
                        <TableCell> Team Name </TableCell>
                        <TableCell> Contact Number </TableCell>
                        <TableCell> Location </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {request.map(function(item,index){
                           return <TableRow key={item.id}>
                                <TableCell> {item.teamName} </TableCell>
                                <TableCell> {item.contactNumber} </TableCell>
                                <TableCell> {item.location} </TableCell>
                                <TableCell>
                                    <Button id="accepted" variant="contained" color="primary" onClick={()=>Accepted(item.id)}>
                                    Accept
                                    </Button>
                                     </TableCell>
                                     <TableCell>
                                    <Button id="rejected" variant="contained" color="secondary" onClick={()=>{Rejected(item.id);handleCloseMatch()}}>
                                    Reject
                                    </Button>
                                    
                                     </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>



        </Grid>


        </Grid>

          </DialogContent>
       
        <DialogActions>
        <Button variant="contained" onClick={()=>handleCloseMatch(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
        
      </Dialog> 



      <Dialog open={reqDialog} onClose={handleCloseReqDialog} aria-labelledby="form-dialog-title" key={"player"}>
        <DialogTitle id="form-dialog-title">Start Match</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Begin match 
          </DialogContentText>
          <TableContainer component={Paper}>
                <Table color="primary">
                    <TableHead>
                        <TableRow>
                        <TableCell> Team Matches </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {AcceptedRequest.map(function(item,index){
                           return <TableRow key={item.id}>
                                <TableCell> {item.senderName} vs {item.receiverName}  </TableCell>
                                <TableCell>
                                    <Button id="accepted" variant="contained" color="primary" onClick={()=>{BeginMatch(item.senderId,item.receiverId,item.id);
                                    }}>
                                    Begin
                                    </Button>
                                     </TableCell>
                                     <TableCell>
                                    <Button id="rejected" variant="contained" color="secondary" onClick={()=>{Rejected(item.id); handleCloseMatch();}}>
                                    Reject
                                    </Button>
                                    
                                     </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>      

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReqDialog} color="primary">
            Cancel
          </Button>
      
        </DialogActions>
      </Dialog>                

                        
  
                
      <Dialog  fullScreen open={matchRoom} onClose={handleCloseMatchroomDialog} aria-labelledby="form-dialog-title" key={"MatchRoom"}>
      <DialogTitle id="form-dialog-title">
      <Typography gutterBottom variant="h4" component="h3">
          Match Room
          </Typography>
          </DialogTitle>
         
        <DialogContent>
               <Card fullWidth>

        <CardContent>
         <Grid container spacing={3}>

              <Grid className={classes.dialog} xs={12}>
                        <Paper className={classes.paper}>
                          Team 1 Vs Team 2
                        </Paper>
                </Grid>          
             <Grid xs={6} >
             <Typography variant='title'>
                          Hello
                        </Typography>

             </Grid>
             <Grid xs ={6}>

                        <Typography variant='title'>
                          Hello
                        </Typography>

             </Grid>


         </Grid>



         </CardContent>
    
                 
                 </Card>         
        </DialogContent>
                        <DialogActions>
                          <Button variant="contained" color="secondary" onClick={()=>handleCloseMatchroomDialog()}>
                            Cancel
                          </Button>
                        </DialogActions>
      </Dialog>
      
    </div>
  );
  
}


import React,{useState,useEffect} from 'react';
import {Box,Button,makeStyles} from '@material-ui/core';
import {myConfig} from '../../Configuration/config';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      background: '#232324',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding: '0 30px',
      fontFamily:"Consolas"
    },
  })



function GameStateDetail()
{

    
async function GetConfigText()
{
   const map= fetch(myConfig.BASEURL+'Player/GetConfigInText',myConfig.GET)
    .then((response)=> {return response.json()})
    .then((json)=>{
    
       console.log(json);
      setConfig(json);
        // console.log(config);

    });
    return map;
}

    async function GetConfig()
{
  //  const map= fetch(myConfig.BASEURL+'Player/GetConfig',myConfig.GET)
  //   .then((response)=> {return response.formData()})
  //   .then((json)=>{
    
  //      console.log(json);
  //     setConfig(json);
  //       // console.log(config);

  //   });
  axios({
    url: myConfig.BASEURL+'Player/GetConfig',
    method:'GET',
    headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'gamestate_integration_testv1.cfg');
    document.body.appendChild(link);
    link.click();
  });

}
useEffect(()=>{
  GetConfigText()
},[])

    const [config,setConfig] = useState(new FormData());  
    const classes = useStyles();
   
        return(<div>
           <Box className={classes.root} color="primary">
      
<p className={classes.root}>
  {
     config
  
  }
</p>

    </Box>
    <Button className={classes.root} onClick={GetConfig}> 
    Download CFG
    </Button>
        </div>)
   
}

export default GameStateDetail;
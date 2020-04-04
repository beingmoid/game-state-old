export const myConfig = {
    // BASEURL:"http://35.154.67.93:8172/api/",
   BASEURL:"http://localhost:4000/api/",
    GET:{
        method:'GET',
        headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
      },
    POST:{
      method:'POST',
      headers:JSON.parse(sessionStorage.token===undefined ? '{}':sessionStorage.token),
    },
    GAMESTATE_URL : "http://localhost:62443/api/Values/"  
}

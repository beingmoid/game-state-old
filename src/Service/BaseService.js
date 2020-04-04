// import axios from 'axios';
// class HttpClient
// {
//     constructor()
//     {
//         const token =JSON.parse(localStorage.getItem('user') || '{}')['token'];
//         const instance = axios.create({

//             baseURL:'/',
//             headers:{'Authorization':`Bearer ${token}`}
//         })
//         this.axiosInstance = instance;
              
//     }

//     getUrl(url)
//     {
//         return this.axiosInstance.get(url)
//         .then((resp)=>{

//         })
//         .catch((resp)=>{
//             if (resp.response !== undefined && resp.response.status == '401') {   
//             localStorage.removeItem('user')
//             location.replace('/login')
//             } else {
//                 return Promise.reject(resp)
//                 }
//         });
//     }
//         setTokenOnLogin = () => {
//             const token = JSON.parse(localStorage.getItem('user') || '{}')['token']
//             this.axiosInstance.defaults.headers = { 'Authorization': `Bearer ${token}` }
//             }
//             clearTokenOnLogout = () => {
//             localStorage.removeItem('user')
//             this.axiosInstance.defaults.headers = {}
//             }
//         }
         
        


// const instance = new httpClient()
        
// export default instance

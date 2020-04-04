import React from 'react';
import { Route , Redirect} from 'react-router-dom';

 const ProtectedRoutes = ({component:Component,...rest})=>{
    return <Route 
    {...rest} render={
        (props)=>{
            if(sessionStorage.user!==undefined)
            {
                return <Component {...props}/>
            }
            else
            {
                return <Redirect to='/login'
                ></Redirect>
            }
           
        }
    }/>
}
export default ProtectedRoutes;
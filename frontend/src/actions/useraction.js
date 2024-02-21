import axios from'axios';
import {LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS} from "../constants/userConstant";
import {server} from "../FixedUrl";

export const login = (email,password) => async(dispatch) =>{

    try{
        dispatch({type:LOGIN_USER_REQUEST});

        const formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        const axiosConfig = {
            withCredentials: true, // Store cookies
            // ContentType: 'application/data' // Handle application/data responses
          };
        const {data} = await axios.post(`${server}/user/login`,formData,axiosConfig);
        if(data.success){
            dispatch({type:LOGIN_USER_SUCCESS,user:data.user});
        }
        else{
            console.log("unsuccessfull");
            dispatch({type:LOGIN_USER_FAIL});
        }
    }
    catch(err){
        dispatch({type:LOGIN_USER_FAIL});
    }

}
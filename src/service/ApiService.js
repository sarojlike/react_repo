
import axios from 'axios';

const API_URL='http://localhost:8080/usercrud';

class ApiService{
   
    createNewUser(formData){
        return axios.post(""+API_URL+'/createuser',formData);
    }

    getStateNames(){
        return axios.get(""+API_URL+'/getstates');
    }

    listAllUser(){
        return axios.get(""+API_URL+'/listAllUser');
    }

    deleteUserById(id){
        return axios.delete(""+API_URL+'/deleteUser/'+id);
    }

    getUserById(id){
        return axios.get(""+API_URL+'/getuser/'+id);
    }

    changeExistingUser(formData){
       return axios.post(""+API_URL+'/changeuser',formData);
        //return axios.put(""+API_URL+'/changeUser',user);

    }
}
export default new ApiService();
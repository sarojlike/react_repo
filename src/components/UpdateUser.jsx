import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import ApiService from '../service/ApiService'

class UpdateUser extends Component{

   
    constructor(props){
        super(props);
      
        this.state={
            id:'',
            name:'',
            loginId:'',
            dob:'',
            password:'',
            emailId:'',
            phoneNo:'',
            province:'',
            uploadFile:'',
            filepath:'',
            errors: {
                name:'',
                loginId:'',
                dob:'',
                password:'',
                emailId:'',
                phoneNo:'',
                province:'',
                uploadFile:''
            },
            sucessmessage:'',
            stateNamesList:''

        }

        this.updateUser=this.updateUser.bind(this);
    }
  
    componentDidMount(){
       // alert(this.props.match.params.id);
       
        this.fetchUserById();
        
        ApiService.getStateNames()
            .then(response => {
                let stateNames = response.data.result;            
            this.setState({
                stateNamesList: stateNames,
            });
        });
    }

    fetchUserById = e =>{
        //let params = queryString.parse(this.props.location.search)
      //  const query = new URLSearchParams(this.props.location.search);
       // const id = query.get('id');
      let id=  window.localStorage.getItem("userId")
        if(id!=undefined && id!=null && id !=''){

            ApiService.getUserById(id)
            .then(response => {
                let user = response.data.result;
                    this.setState({
               
                            id: user.id,
                            name:user.name,
                            loginId:user.loginId,
                             password:user.password,
                             emailId:user.emailId,
                             phoneNo:user.phoneNo,
                             province:user.stateName,
                             uploadFile:user.filePath,
                             filepath:user.filePath
                })
                this.setDob(new Date(parseInt(user.stringDob)))
    
            });

        }
       
        
    }

    setDob = date =>{
        this.setState({
            dob: date
        });

    } 

      setValue= e =>{
           
        this.setState({
                 [e.target.name] : e.target.value
          });
   }

   handleChange = date => {
     
       this.setState({
           dob: date
       });
     };


    

     updateUser (e){

        let error=this.state. errors;
        let count = Object.keys(error).length;
       
        if(this.state.name == ''){
            error.name='name is required';
        }else{
            error.name='';
        }

        if(this.state.loginId == ''){
            error.loginId='loginId is required';
        }else{
            error.loginId='';
        }
    
        if(this.state.uploadFile == null){
            error.uploadFile='uploadFile is required';          
        }else{
            error.uploadFile='';
        }
      
        if(this.state.dob == ''){
            error.dob='dob is required';     
        }else{
            error.dob='';
        }
      
    
        if(this.state.password == ''){  
          error. password ='password is required';
        }else{
            error. password ='';
        }
        if(this.state.emailId == ''){
            error.emailId='emailId is required';
        }else{
            error. emailId ='';
        }
        if(this.state.phoneNo ==''){
            error. phoneNo='phoneNo is required';
        }else{
            error. phoneNo='';
        }

        if(this.state.province ==''){
             error.province='state is required';
        }else{
            error.province='';
        }
     
        this.setState({errors: error});

        if(error.name ==='' && error.loginId ==='' && error.loginId ==='' && error.dob ==='' && error.password ==='' && error.emailId ==='' && error.phoneNo ==='' && error.province ==='' && error.uploadFile ===null ){
            return false;
        }

        
        
        let user={id:this.state.id,name:this.state.name,loginId:this.state.loginId,stringDob:this.state.dob.getTime(),password:this.state.password , phoneNo:this.state.phoneNo,emailId:this.state.emailId,stateName:this.state.province,filePath:this.state.filepath};

       // window.localStorage.clear();
        let formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(user)], {
            type: "application/json"
        }));
        ApiService.changeExistingUser(formData)
        .then(response => {

                let message=response.data.message;
                let result=response.data.result;
                //window.location.href = response.url;
                alert(message);
                if(message === 'error' ){
                    this.setState({errors: result});
                }
                if(message === 'success'){
                    this.setState({
                        sucessmessage : 'User Updated Sucessfully',
                        errors: []
                       

                   });
                   setTimeout(() => { 
                    this.props.history.push("/listUser");
                }, 3000);

                }
                   

               
      

     });

    }

  

    render(){
        return (
                <div className="container">
                   
                   
                    <form name="myForm" >
                       
                       <input type="hidden" valu={this.state.id} />
                        <div className="row mt-5">

                            <div className="col-sm">
                                <label className="float-right">Name: </label> 
                            </div>

                            <div className="col-sm">
                                <input type = "text" name="name"  value={this.state.name} onChange={this.setValue} className="form-control" /> 
                                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                             </div>

                             <div className="col-sm">
                                 <label  className="float-right">Login-id: </label> 
                             </div>

                            <div className="col-sm">
                                 <input type = "text" name="loginId" value={this.state.loginId} onChange={this.setValue} className="form-control"/> 
                                 <span style={{color: "red"}}>{this.state.errors["loginId"]}</span>
                            </div>
    

                        </div>
                        
                        <div className="row mt-2">

                
                            <div className="col-sm">
                                <label className="float-right">Dob: </label> 
                            </div>

                            <div className="col-sm">
                                
                                <DatePicker  name="dob" selected={this.state.dob}  onChange={this.handleChange}  className="form-control" dateFormat="dd-MM-yyyy" showMonthDropdown showYearDropdown dropdownMode="select" minDate={new Date('1-01-1970')} maxDate={new Date()}  onKeyDown={e => e.preventDefault()}  />
                                <span style={{color: "red"}}>{this.state.errors["dob"]}</span>
                             </div>

                             <div className="col-sm">
                                 <label  className="float-right">PassWord: </label> 

                             </div>

                            <div className="col-sm">
                                 <input type = "password"   name="password" value={this.state.password} onChange={this.setValue} className="form-control"/> 
                                 <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                            </div>
    


                        </div>

                        <div className="row mt-2">

                            <div className="col-sm">
                                <label className="float-right">EmailId: </label> 
                            </div>

                            <div className="col-sm">
                                <input type = "text"  name="emailId" value={this.state.emailId} onChange={this.setValue} className="form-control"/> 
                                <span style={{color: "red"}}>{this.state.errors["emailId"]}</span>
                             </div>

                             <div className="col-sm">
                                <label className="float-right">Phone no: </label> 
                            </div>

                            <div className="col-sm">
                                <input type = "text"  name="phoneNo" value={this.state.phoneNo} onChange={this.setValue} className="form-control"/> 
                                <span style={{color: "red"}}>{this.state.errors["phoneNo"]}</span>
                             </div>


                        </div>
                        <div className="row mt-2">

                        <div className="col-sm">
                                <label className="float-right">State Name: </label> 
                            </div>

                    <div className="col-sm">
                       
                         <select name="province" value={this.state.province} onChange={this.setValue} className="form-control" >
                             <option value="0">{this.state.province}</option>
                         {
                            
                             Object.entries(this.state.stateNamesList).map(([key, value]) => {
                                return <option key={key} value={key}>{value}</option>
							})
                            
                        }
                    </select>
                        
                    <span style={{color: "red"}}>{this.state.errors["province"]}</span>
                       
                  </div>
                  <div className="col-sm">
                                <label className="float-right">Select File: </label> 
                            </div>
                  <div className="col-sm">
                      <input type="text" name="uploadFile" value={this.state.uploadFile}    onChange={this.setValue} className="form-control" onKeyDown={e => e.preventDefault()}/>
                      <span style={{color: "red"}}>{this.state.errors["uploadFile"]}</span>
                  </div>

                        </div>


                        <div className="row mt-2">
                        <div className="col-md-5 text-center"></div>
                            <div className="col-md-4 text-center">
                                <input type = "submit"   value = "Submit" className="btn btn-primary" onClick={this.updateUser}/>
                            </div>

                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6 text-center"></div>
                                <div className="col-md-6 " >
                                   
                                        <strong style={{color: "green"}}>{this.state.sucessmessage}</strong> 
                                    
                                </div>
                        </div>
                        
                    </form> 

                </div>

        );

    }

}

export default UpdateUser;
import React,{Component} from 'react';
import ApiService from '../service/ApiService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class CreateUserComponent extends  Component{

    constructor(props){
        super(props);
       
        this.state={
            name:'',
            loginId:'',
            dob:'',
            password:'',
            emailId:'',
            phoneNo:'',
            province:'',
            uploadFile:null,
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

      this.saveUser=this.saveUser.bind(this);
     

     }
     

     componentDidMount() {
     
        ApiService.getStateNames()
            .then(response => {
                let stateNames = response.data.result;            
            this.setState({
                stateNamesList: stateNames,
            });
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
  
        saveUser(e){
                     
            e.preventDefault();
            
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

            if(error.name ==='' && error.loginId ==='' && error.loginId ==='' && error.dob ==='' && error.password ==='' && error.emailId ==='' && error.phoneNo ==='' && error.province ==='' && error.uploadFile ==='' ){
               
                
                let formData = new FormData();
            
                let user={name:this.state.name,loginId:this.state.loginId,stringDob:this.state.dob.getTime(),password:this.state.password , phoneNo:this.state.phoneNo,emailId:this.state.emailId,stateName:this.state.province};
                
                formData.append("file", document.forms['myForm'].uploadFile.files[0]);
                formData.append('user', new Blob([JSON.stringify(user)], {
                    type: "application/json"
                }));
                
                 ApiService.createNewUser(formData)
                 .then(res=>{
                    let message=res.data.message;
                    let result=res.data.result;
                    
                    if(message === 'error' ){
                        this.setState({errors: result});
                    }
                    if(message === 'success'){
                        this.setState({
                            sucessmessage : 'User Saved Sucessfully',
                            errors: []
                           
    
                       });
                   
    
                        setTimeout(() => { 
                            this.props.history.push("/listUser");
                        }, 3000);
    
                        
                    }
    
                });
               
            }else{
                return false;
            }

            
        }

    render(){
        return(
                <div className="container">
                   
                   
                    <form name="myForm" onSubmit={this.validateForm}>
                       
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
                             <option value="0">--select--</option>
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
                      <input type="file" name="uploadFile"   onChange={this.setValue} className="form-control"/>
                      <span style={{color: "red"}}>{this.state.errors["uploadFile"]}</span>
                  </div>

                        </div>


                        <div className="row mt-2">
                        <div className="col-md-5 text-center"></div>
                            <div className="col-md-4 text-center">
                                <input type = "submit"   value = "Submit" className="btn btn-primary" onClick={this.saveUser}/>
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

export default CreateUserComponent;
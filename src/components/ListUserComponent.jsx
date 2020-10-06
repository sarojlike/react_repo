import React ,{Component} from 'react';
import ApiService from '../service/ApiService';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';


class ListUserComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            users:[],
            id:''
           
        }

        
        this.deleteUser = this.deleteUser.bind(this);
    }


   
   
    deleteUser() {
     
        ApiService.deleteUserById(this.state.id).then(res=>{
            let message=res.data.message;
            if(message === 'sucess'){
                window.location.reload(true);
            }

        })
       
    }

    updateUser = e =>{
        
        window.localStorage.setItem("userId", this.state.id);
        //this.props.history.push("./updateUser?id="+this.state.id);
        this.props.history.push('/update-user');
    }


    componentDidMount(){
       
            $('#myTable')   
            .DataTable( {
                "serverSide": true,
                 "bFilter": true,
                 "search": {
                        "caseInsensitive": false
                      },
                      "lengthMenu": [
                          [ 5,10, 25, 50,100, -1 ],
                          [ '5 rows','10 rows', '25 rows', '50 rows', '100 rows','Show all' ]
                      ],
                 "language": {
                     "sEmptyTable": "No records available ",
                 },
                 "pageLength": 5,
                "ajax": {
                    "type": "POST",
                    "url": "http://localhost:8080/usercrud/sendPageRequestUserList",
                    "data": function ( data ) {
                 }
         
                },
                
                "columns": [
                    
                           
                              { "data": "name", "name" : "name" , "title" : "Name","defaultContent": "","searchable": true},
                              { "data": "loginId", "name" : "loginId", "title" : "login-id","defaultContent": "" ,"searchable": false },
                              { "data": "dob", "name" : "dob" , "title" : "Date Of Birth","defaultContent": "","searchable": false},
                              { "data": "emailId", "name" : "emailId" , "title" : "Email -id","defaultContent": "","searchable": false},
                              { "data": "phoneNo", "name" : "phoneNo" , "title" : "Phone-no","defaultContent": "" ,"searchable": false},
                              { "data": "stateName", "stateName" : "state" , "title" : "State","defaultContent": "","searchable": false},
                              { "data": "filePath", "name" : "filePath" , "title" : "File Path","defaultContent": "","searchable": false},
                              { "data": "id",title: "Delete",   "createdCell": (td, cellData, rowData, row, col) => {
                                
                                 $(td).html('<i class="fa fa-trash" aria-hidden="true" style="color:black"></i>');
                                 $(td).click(e => {
                                    this.state. id=cellData;
                                    if (window.confirm('Are you sure you wish to delete this item?')){
                                        this.deleteUser();
                                    }

                                  
                                    
                                 })
                               }
                              ,"searchable": false    
                            },
                            
                            { "data": "id",title: "Edit",  "createdCell": (td, cellData, rowData, row, col) => {
                                
                                $(td).html('<i class="fa fa-edit" aria-hidden="true" style="color:black"></i>');
                                $(td).click(e => {
                                   this.state. id=cellData;
                                   this.updateUser();
                                })
                              }
                             ,"searchable": false    
                           }
                            
                        ]    
         });
       
    }


    render(){

        return (
            <div className="container mt-5 clearfix" style={{border: "solid silver 1px"}}>

                <div className="table table-responsive">

                    <table className="table table-striped" id="myTable">
    
                        <thead><tr><th>Name</th><th>login-id</th><th>Date Of Birth</th> <th>Email -id</th><th>Phone-no</th><th>State</th><th>File Path</th><th>Delete</th><th>Edit</th></tr></thead>
                        

                    </table>

                </div>

              

            </div>


            

        );

      

    }

}
export default ListUserComponent;


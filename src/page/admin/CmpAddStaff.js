import { useState } from "react";
import './CmpAddStaff.css';
function CmpAddStaff(){
    let [formData,setFormData]=useState({
    
        name:'',
        address:'',
        phn_no:'',
        email:'',
        password:''



    });


    const save_staff=(e)=>{
        e.preventDefault();
        const data=new FormData();
        
        data.append("name",formData.name);
        data.append("address",formData.address);
        data.append("phn_no",formData.phn_no);
        data.append("email",formData.email);
        data.append("password",formData.password);
        


        fetch('http://localhost/ticket_collection/save_staff.php',{
          method:"POST",
       
          body:data
        }
        )
        .then((result)=>{return result.json();
      
        })
        .then((data)=>{
          if(data.Status=="true")
          {
            alert("successfully saved")
            
          }
          else
          {
            alert(data.Message)
          }
        })
      
      }
      const handleChange=(e)=>{
        let name=e.target.name;
              let value=e.target.value
              setFormData({
                  ...formData,
                  [name]: value
              });
            }

  return (
    <>


<h1>Add New Staff</h1>
        <div class="card">
             <div class="class-header">
                
             </div>
             <div class="card-body">
             <form class="row g-3" onSubmit={save_staff}>
                    <div class="form-group">
                        <label>Full Name </label>
                        <input onChange={handleChange} type="text" class="form-control" name="name" />
                    </div>
                    <div class="form-group">
                        <label>Address </label>
                        <input onChange={handleChange} type="text" class="form-control" name="address" />
                    </div>
                    
                    <div class="form-group">
                        <label>Phone Number </label>
                        <input onChange={handleChange}type="text" class="form-control" name="phn_no" />
                    </div>
                    
                    <div class="form-group">
                        <label>Email Id </label>
                        <input onChange={handleChange} type="email" class="form-control" name="email" />
                    </div>
                    <div class="form-group">
                        <label>Password </label>
                        <input onChange={handleChange} type="password" class="form-control" name="password" />
                    </div>
                    <div class="form-group pt-2">
                        
                    <button type="submit" class="btn btn-primary mb-3">Save</button>
                    </div>
                 </form>
             </div>
             </div>
        </>
    )
}

export default CmpAddStaff
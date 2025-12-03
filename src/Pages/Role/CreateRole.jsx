import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const CreateRole = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [role, setRole]=useState({
    name:""
    // email:""
  });
const navigate =useNavigate();

  const handleChange=(e)=>{
    const {value,name}=e.target;
    console.log(name, value);
    console.log(value, name);
    setRole((prv)=>({
      ...prv,
      [name]:value
    }));
  }

const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(role);


axios({
    url:`${baseUrl}/role/save`,
    method:"POST",
    data: {role},
    

})
.then(res=>{
  console.log(res)
  if(res){
    navigate('/Role');
  }
})
.catch(err=>{
  console.log(err)
})

}








  return (
    <>
    
    <div className="container mt-5">
  <div className="card shadow-sm">
    <div className="card-body">
      <h4 className="card-title mb-4 text-center">Contact Form</h4>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" id="name" placeholder="Enter your name" onChange={handleChange} />
        </div>
        {/* Email */}
        {/* <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"  onChange={handleChange} />
        </div> */}
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  </div>
</div>


    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default CreateRole
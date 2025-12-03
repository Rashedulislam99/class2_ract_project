import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditRole = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { roleId } = useParams();
  const [role, setRole] = useState({
    id: "",
    name: ""
  });
  const navigate = useNavigate();

  function fetchRole() {
    axios({
      url: `${baseUrl}/role/find/${roleId}`,
      
      method: "GET"
    })
      .then(res => {
        setRole({
          id: res.data.role.id,
          name: res.data.role.name
        });
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchRole();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios({
       url: `${baseUrl}/role/update`,
     
      method: "PUT",
      data: { role }
    })
      .then(res => {
        navigate("/role");
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h4>Edit Role</h4>
        <input
          type="text"
          className="form-control"
          value={role.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  );
}

export default EditRole;
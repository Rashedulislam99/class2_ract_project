import React, {  useEffect } from 'react'

const Logout = () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const logout = () => {
   
    try {
      fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Accept": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    } catch (error) {
      console.log(error);

    }


  }

   useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    window.location.href = "/login";
   }, []);


  return (
    <div>Logout</div>
  )
}

export default Logout
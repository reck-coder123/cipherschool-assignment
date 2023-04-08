import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile=()=>{
    const [user, setUser] = useState(null);
  const { userId } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/api/profile/${userId}`, {
      method: "GET",
      
    });
    const data = await response.json();
    setUser(data);
    
  };
  useEffect(() => {
    getUser();
  }, []); 

  if (!user) return null;
    return (
        <>
        <h1>{user.email}</h1>
        </>
    )
};
export default Profile
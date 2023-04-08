import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Signup=()=>{
    const [data, setData] = useState({
		firstname: "",
        lastname:"",
		email: "",
        mobile:"",
		password: "",

	});
    const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
const success= ()=>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

const failure=()=>{
    toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}
const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:8080/api/users";
        const { data: res } = await axios.post(url, data);
        setMsg(res.message);
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            setError(error.response.data.message);
        }
    }
};

return(
    <>
    {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
    <header>
        <nav>
            <img src="https://www.cipherschools.com/static/media/Cipherschools_lightmode@3x.f8ba826cff0c3dc93e9b.png" alt="logo" style={{width:"10%",height:"10%", margin:'10px', padding:'20px'}} />

        </nav>
    </header>
    <div className={styles.form}>
        <h1>SignUP</h1>
        <h3>Create your Account</h3>
        <p>Please provide your valid informations to signup </p>
<div className="formcontrol">
<Form method="post" onSubmit={handleSubmit}>
      <Form.Group  className="mb-3" controlId="formGroupEmail" >
        
        <Form.Control type="text" name="firstname" value={data.firstname}  onChange={handleChange} placeholder="First Name " required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        
        <Form.Control type="text" name="lastname" value={data.lastname}   onChange={handleChange} placeholder="Last Name " required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">

      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter email" required />
      </Form.Group>

        
        <Form.Control type="text" name="mobile" value={data.mobile}  onChange={handleChange} placeholder="Mobile(optional) " />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Control type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{width:'100%',backgroundColor:"orange", border:'1px orange'}} onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
    <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
</div>
<div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div>
    </div>
    </>
)
}
export default Signup;

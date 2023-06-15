
// import { Button, Checkbox, Form, Input } from 'antd';

// import React, { useState } from 'react'


// export default function Register() {

//     const [register, setRegister] = useState({
//         email: "",
//         password: ""
//     })

//     const handelRegister = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await fetch("http://localhost:5001/user/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(register),
//             })

//             const data = await response.json()
//             if (data.err) {
//                 alert(data.err)
//             }
//             console.log(data);

//         }

//         catch (err) {
//             console.log(err);

//         }
//         setRegister({ email: "", password: "" })
//     }
//     return (
//         <>
//             <form onSubmit={handelRegister}>

//                 <label htmlFor='name'>
//                     name
//                     <input value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} id="name" /><br />
//                     <label htmlFor='password'></label>
//                     password
//                     <input value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} id="password" /><br />
//                     <button>register</button>
//                 </label>
//             </form>
//         </>
//     )
// }



import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import './Register.css';
import { useNavigate } from 'react-router-dom';



export default function Register({active, setActive}) {
  const [register, setRegister] = useState({
    email: '',
    password: ''
  });
 const navigate = useNavigate ()
 console.log(active)
  const handelRegister = async (e) => {
    console.log('helo')
    
        try {
          const response = await fetch("http://localhost:5001/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(register),
          });
          const data = await response.json();
          console.log(data);
          if (data) {
            setActive (!active)
            navigate('/login')
            
        }
        } 
         catch (err) {
          console.error(err);
        }
      
  };
console.log(register)
  return (
    <div className="register-container">
      <Form onFinish={handelRegister} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password
            value={register.password}
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


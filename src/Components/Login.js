
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const Navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handelLogin = async (e) => {
        try {
            const response = await fetch("http://localhost:5001/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            })
            const data = await response.json()
            console.log(data);
            const token = data.jwt
            localStorage.setItem('token', token);

             console.log(token);
            if (data.err) {
                alert(data.err)
            }
            if (data.user.role === 1 && token) {

                Navigate('/adminpage')
            } else { Navigate('/login') }
            setLogin({ email: "", password: "" });
         }
          catch (err) {
            console.log(err);
         }

    }
    return (
        <div className="login-container">
             <Form
                onFinish={handelLogin}
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
                </Form.Item>
                 <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}



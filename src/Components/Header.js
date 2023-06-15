import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'antd';

export default function Header({active, setActive}) {
  return (
    <>
      <Menu theme="dark" mode="horizontal" style={{ backgroundColor: 'dark' , display: 'flex', justifyContent: 'flex-end'}}>
        <Menu.Item key="register" style={{ fontSize: '20px', padding: '8px 16px', margin: '0 8px' }}>
          <Link to="register">Register</Link>
        </Menu.Item>
        <Menu.Item key="login" style={!active ? { fontSize: '20px', backgroundColor: 'blue', color:'white', padding: '8px 16px', margin: '0 8px' } : { fontSize: '20px', padding: '8px 16px', margin: '0 8px' }}>
  <Link to="login">Login</Link>
</Menu.Item>

      </Menu>
      <Outlet/>
    </>
  );
}






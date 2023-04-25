import { BarsOutlined, ShoppingOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // import Link and Outlet from react-router-dom

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Categories', 'sub1', <BarsOutlined />, [
    getItem('Add category', '1'),
    getItem('Edit/Delete category', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Products', 'sub2', <ShoppingOutlined />, [
    getItem('Add product', '5'),
    getItem('Edit/Delete product', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),
  getItem('Statistics', 'sub4', <AreaChartOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const AdminPage = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
      >
        {items.map(item => (
          <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
            {item.children.map(child => (
              <Menu.Item key={child.key} icon={child.icon}>
                <Link to={`/${child.key}`}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
      <Outlet /> {/* Render nested routes */}
    </>
  );
};



export default AdminPage;

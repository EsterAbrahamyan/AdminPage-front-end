// import { BarsOutlined, ShoppingOutlined, AreaChartOutlined } from '@ant-design/icons';
// import { Menu, Switch } from 'antd';
// import { useState } from 'react';
// import { Link } from 'react-router-dom'; // import Link and Outlet from react-router-dom

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//   getItem('Categories', 'sub1', <BarsOutlined />, [
//     getItem('Add category', '1'),
//     getItem('Edit/Delete category', '2'),
//     getItem('Option 3', '3'),
//     getItem('Option 4', '4'),
//   ]),
//   getItem('Products', 'sub2', <ShoppingOutlined />, [
//     getItem('Add product', '5'),
// getItem('products', 'products'),
//     getItem('Submenu', 'sub3', null, [
//         getItem('Option 7', '7'),
//       getItem('Option 8', '8'),
//     ]),
//   ]),
//   getItem('Statistics', 'sub4', <AreaChartOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Option 11', '11'),
//     getItem('Option 12', '12'),
//   ]),
// ];

// const AdminPage = () => {
//   const [theme, setTheme] = useState('dark');
//   const [current, setCurrent] = useState('1');

//   const changeTheme = (value) => {
//     setTheme(value ? 'dark' : 'light');
//   };

//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };

//   return (
//     <>
//       <Switch
//         checked={theme === 'dark'}
//         onChange={changeTheme}
//         checkedChildren="Dark"
//         unCheckedChildren="Light"
//       />
//       <br />
//       <br />
//       <Menu
//         theme={theme}
//         onClick={onClick}
//         style={{
//           width: 256,
//         }}
//         defaultOpenKeys={['sub1']}
//         selectedKeys={[current]}
//         mode="inline"
//       >
//         {items.map(item => (
//           <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
//             {item.children.map(child => (
//               <Menu.Item key={child.key} icon={child.icon}>
//                 <Link to={`/${child.key}`}>{child.label}</Link>
//               </Menu.Item>
              
//             ))}
//           </Menu.SubMenu>
//         ))}
//       </Menu>
//       {/* <Outlet /> Render nested routes */}
//     </>
//   );
// };



// export default AdminPage;



import { Link, Outlet } from "react-router-dom" 


import { MenuItem, MenuList, Box } from "@mui/material";


function AdminPage() {
  return (
    
      <Box
        sx={{
          display: 'flex' ,
          
          width: 220,
          height: "91vh",
          maxWidth: "100%",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          borderRadius: "none",
          backgroundColor:"black"
        }}
      >
        <MenuList sx={{ display: "flex", flexDirection: "column", gap: "20px", color:"white", marginRight: 20}}>
          <MenuItem sx={{ marginTop: "15px" }}>Dashboard</MenuItem>
          
          <Link to="products">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Products</MenuItem>
          </Link>
          <Link to="categories">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Categories</MenuItem>
          </Link>
          <Link to="/users">
            <MenuItem sx={{color: "white", textDecoration: "none"  }}>Users</MenuItem>
          </Link>
        </MenuList>
        <Outlet/>
      </Box>
  );
}

export default AdminPage;
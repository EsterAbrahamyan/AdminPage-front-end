// import React from "react";
// import { Table, Tag, Space } from "antd";
// import { Link } from "react-router-dom";

// const Products = ({ products, deleteProduct }) => {
//     console.log('barev');
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Category",
//       key: "category",
//       dataIndex: "category",
//       render: (_, product) => (
//         <>
//           {product.tags.map((tag) => {
//             let color = tag.length > 5 ? "geekblue" : "green";
//             if (tag === "loser") {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, product) => (
//         <Space size="middle">
//           <Link to={`/updateProduct/${product.id}`}>Edit</Link>
//           <span onClick={() => deleteProduct(product.id)}>Delete</span>

//         </Space>
        
//       ),
//     },
//   ];

//   return (
//     <Table columns={columns} dataSource={products} />
//   );
// }

// export default Products;




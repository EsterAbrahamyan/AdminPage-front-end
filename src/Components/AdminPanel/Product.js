import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import useProduct from "./productHooks/UseProduct";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";


function Products() {
  const [active, setActive] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const {products, deleteProduct, editProduct} = useProduct()
  
  const [edit, setEdit] = useState({
    name:"",
    description:"",
    price:"",
    categoryId:"",
    image: null,
  })
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };


  console.log(edit);

  return (
    <div>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            marginTop: "20px",
          }}
        >
          <Button variant="contained">
            <Link to="createProduct">New Product</Link>
          </Button>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", margin: "50px auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {products?.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">
                  {selectedImage ? (
      <img src={URL.createObjectURL(selectedImage)} width="80px" />
    ) : (
      <img src={product.image} width="80px" />
    )}
    <input
      accept="image/*"
      id={`image-upload-${product.id}`}
      type="file"
      style={{ display: "none" }}
      onChange={handleImageChange}
    />
    <label htmlFor={`image-upload-${product.id}`}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <PhotoCamera />
      </IconButton>
    </label>
  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.description}</TableCell>
                   <TableCell align="center">{product.Category ? product.Category.name : ''}</TableCell> 

                  <TableCell align="center">
                    <Link to={`updateproduct/${product.id}`}>
                      <EditIcon />
                    </Link>
                    <DeleteOutlineIcon onClick={()=>deleteProduct(product.id)} />
                  </TableCell>
                </TableRow>
              ))}
           
           </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Products;
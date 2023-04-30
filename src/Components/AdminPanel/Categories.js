import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import { Typography, Box, TextField, IconButton, Snackbar, Button } from '@mui/material';
import Alert from '@mui/material/Alert';

const Root = styled("div")({
    margin: "2rem",
});

const CategoryContainer = styled(Paper)({
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [remove, setRemove] = useState(false);
    const [add, setAdd] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [active, setActive] = useState(false);
    const [rename, setRename] = useState({ name: "", id:"" })
    const [update, setUpdate] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeId, setActiveId] = useState(true);
    const[notremove,setNotRemove]=useState("")
    const[correct,setCorrect]=useState(false)
    


    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch("http://localhost:5001/cat/categories", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, [remove, add, update, token]);

    const handleDelete = (id) => {
        fetch(`http://localhost:5001/cat/delete/&{id}`, {
            method: "DELETE",
            body: JSON.stringify({
                id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    setNotRemove(data.error)
                    setCorrect(true)
                }else{
                setSnackbarOpen(true)

                setSnackbarMessage(data.message)

                setRemove(!remove)}
            })
            .catch((err) => console.log(err));
    };


    const changeCategory = async (id) => {


        fetch(`http://localhost:5001/cat/update`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({name:rename.name, id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setSnackbarOpen(true)
            setUpdate(!update)
            setSnackbarMessage(data.message)

          })
          .catch((err) => console.log(err));
    };

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if (!name) {
                setError(true)
                return
            }
            const response = await fetch('http://localhost:5001/cat/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Error adding category', response.statusText);
            }

            const data = await response.json();
            console.log(data);

            setAdd(!add);
            setName('');
            setError(false)
            setSnackbarOpen(true);
            setSnackbarMessage('Category created');
        } catch (err) {
            console.error(err);
            // display error message to user
        }
    };
    console.log(rename);
    

    return (
        <Root>
            <Typography variant="h6">Categories</Typography>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem"
            }}>

                <TextField
                    sx={{ minWidth: "20rem" }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!name && error}

                    helperText={!error ? null : "fill in the field"}
                    
                />


                <Button onClick={createCategory} variant="contained" color="primary" sx={{ marginLeft: "1rem" }}>
                    Add Category
                </Button>
            </Box>


            {categories.map((category) => (
    <CategoryContainer key={category.id}>
        <TextField
            value={
                rename.id === category.id && rename.name.length >= 0
                    ? rename.name
                    : category.name
            }
            onChange={(e) => {
                setRename({
                    ...rename,
                    name: e.target.value,
                    id: category.id,
                });

               e.preventDefault()
            }}
            error={ activeId===category.id && correct}

            InputProps={{
                readOnly: !active || activeCategory !== category.id,
            }}
            helperText={activeCategory === category.id ? "Edit Category" : (activeId === category.id && notremove ? true : null)}

   
        />

        <div>
            <IconButton
                aria-label="delete"
                onClick={() => {handleDelete(category.id)
              setActiveId(category.id)
                   
            }}
            >
                <DeleteIcon />
            </IconButton>
            {activeCategory === category.id ? (
                <Button
                    onClick={(e) => {
                        setActive(!active);
                        setActiveCategory(null);
                        changeCategory(category.id);
                        setRename({ id: "", name: "" });
                   
                    }}
                >
                    save
                </Button>
            ) : (
                <Button
                    onClick={(e) => {
                        setActiveCategory(category.id);
                        setActive(!active);
                    
                    }}
                    sx={{ cursor: "pointer" }}
                >
                    edit
                </Button>
            )}
        </div>
    </CategoryContainer>
))}


            <Snackbar open={snackbarOpen}
                sx={{
                    marginRight: "250px",
                    marginTop: "50px"
                }}
                autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Root>
    );
}
export default Categories
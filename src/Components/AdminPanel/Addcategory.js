import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [remove, setRemove] = useState(false);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5001/cat/categories", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, [remove, add]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/cat/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnackbarOpen(true);

        setSnackbarMessage(data.message);

        setRemove(!remove);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    fetch("http://localhost:5001/cat/update", {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        setError(true);
        return;
      }
      const response = await fetch("http://localhost:5001/cat/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Error adding category", response.statusText);
      }

      const data = await response.json();
      console.log(data);

      setAdd(!add);
      setName("");
      setError(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Category created");
    } catch (err) {
      console.error(err);
      // display error message to user
    }
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <p>{category.name}</p>
          <button onClick={() => handleDelete(category.id)}>Delete</button>
          <button onClick={() => handleUpdate()}>Edit</button>
        </div>
      ))}
    </>
  );
};

export default Categories;

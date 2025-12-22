import React, { useEffect, useState } from "react";
import "./users.css";
import Modal from "../components/Modal";

// https://jsonplaceholder.typicode.com/users

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [currentGender, setCurrentGender] = useState("male");
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const generateRandomGender = (array) => {
    const updated = array.map((person) => ({
      ...person,
      gender: Math.random() > 0.5 ? "male" : "female",
    }));

    return updated;
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        data = generateRandomGender(data);
        setUsers(data);
      });
  }, []);

  const filteredUsers = users.filter((user) => user.gender === currentGender);

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const setData = (setter, e) => {
    const { name, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    console.log("handling change");
    if (!isEditing) {
      setData(setNewUser, e);
    } else {
      setData(setEditData, e);
    }
  };

  const updateUser = () => {
    if (editData.name.trim() === "" || editData.email.trim() === "") {
      alert("Please fill in all the fields");
      return;
    }
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingId
          ? { ...user, name: editData.name, email: editData.email }
          : user
      )
    );
    setIsEditing(false);
  };

  const addNewUser = () => {
    if (newUser.name.trim() === "" || newUser.email.trim() === "") {
      alert("Please provide a name and email");
      return;
    }

    const userToAdd = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      gender: "male",
    };

    setUsers((prev) => [...prev, userToAdd]);
  };

  const initEdit = (user) => {
    setIsEditing(true);
    setEditingId(user.id);
  };

  return (
    <div className="users-container">
      {isEditing && (
        <Modal
          title={"Edit User"}
          isEditing={true}
          onCancel={() => setIsEditing(false)}
          onSubmit={updateUser}
          handleChange={handleChange}
        />
      )}
      <h1>User Management</h1>

      <div className="form">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="New user name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="New user email"
        />
        <button onClick={addNewUser}>Add User</button>

        <div className="gender-filters">
          <button onClick={() => setCurrentGender("male")}>Male</button>
          <button onClick={() => setCurrentGender("female")}>Female</button>
        </div>
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => {
          return (
            <div className="user-item" key={user.id}>
              <li>
                {user.name} - {user.email} ({user.gender})
              </li>
              <div className="buttons">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
                <button onClick={() => initEdit(user)} className="edit-btn">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;

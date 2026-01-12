import React, { useEffect, useState } from "react";
import "./users.css";
import Modal from "./Modal";
import Notification from "./Notification";

// https://jsonplaceholder.typicode.com/users

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [currentGender, setCurrentGender] = useState("all");
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [maxAgeFilter, setMaxAgeFilter] = useState(15);
  const [finalAgeFilter, setFinalAgeFilter] = useState(0);
  const [displayNotification, setDisplayNotification] = useState(false)
  const [notificationMsg, setNotifcationMsg] = useState("")

  const generateGenderAge = (array) => {
    const updated = array.map((person) => ({
      ...person,
      gender: Math.random() > 0.5 ? "male" : "female",
      age: Math.floor(Math.random() * 30) + 1,
    }));

    return updated;
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        data = generateGenderAge(data);
        console.log(data)
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    console.log(finalAgeFilter)
  }, [finalAgeFilter])


  const filteredUsers = users.filter((user) => currentGender !== "all" ? ( user.gender === currentGender && user.age <= finalAgeFilter) : user.age <= finalAgeFilter);


  const deleteUser = (id) => {
    const userBeingDeleted = users.find((user) => user.id === id)
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setDisplayNotification(true)
    setNotifcationMsg(`${userBeingDeleted.name} deleted successfully!`)
    setTimeout(() => {
      setDisplayNotification(false)
    }, 2000);
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
    setDisplayNotification(true)
    setNotifcationMsg("User edited successfully!")
    setTimeout(() => {
      setDisplayNotification(false)
    }, 2000);
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
      {displayNotification && <Notification message={notificationMsg} />}
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
          <button style={{backgroundColor: currentGender === "male" ? "green" : ""}} onClick={() => setCurrentGender("male")}>Male</button>
          <button style={{backgroundColor: currentGender === "female" ? "green" : ""}} onClick={() => setCurrentGender("female")}>Female</button>
          <button style={{backgroundColor: currentGender === "all" ? "green" : ""}} onClick={() => setCurrentGender("all")}>All</button>
        </div>

        <label htmlFor="ageFilter">Max Age: {maxAgeFilter}</label>
        <input onChange={(e) => setMaxAgeFilter(e.target.value)} 
               onMouseUp={(e) => setFinalAgeFilter(e.target.value)} 
               type="range" id="ageFilter" 
               min={0} max={30} 
               value={maxAgeFilter}
        />
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => {
          return (
            <div className="user-item" key={user.id}>
              <li>
                {user.name} - {user.age} ({user.gender})
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

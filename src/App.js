import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "./memdb.js";
import "./App.css";
import CustomerList from "./component/CustomerList.js";
import CustomerForm from "./component/CustomerForm.js";

function log(message) {
  console.log(message);
}

export function App() {
  const blankCustomer = { id: -1, name: "", email: "", password: "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  const mode = formObject.id >= 0 ? "Update" : "Add";

  useEffect(() => {
    getCustomers();
  }, []);

  function getCustomers() {
    log("in getCustomers()");
    setCustomers(getAll());
  }

  function handleListClick(item) {
    setFormObject(formObject.id === item.id ? blankCustomer : item);
    log("in handleListClick()");
  }

  function handleInputChange(event) {
    log("in handleInputChange()");
    const { name, value } = event.target;
    setFormObject(prev => ({ ...prev, [name]: value }));
  }

  function onCancelClick() {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  function onDeleteClick() {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
      getCustomers(); // make sure UI updates!
    }
    setFormObject(blankCustomer);
    log("in onDeleteClick()");
  }

  function onSaveClick() {
    if (mode === "Add") {
      post(formObject);
    } else {
      put(formObject.id, formObject);
    }
    getCustomers();
    setFormObject(blankCustomer);
    log("in onSaveClick()");
  }

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedId={formObject.id}
        onSelect={handleListClick}
      />
      <CustomerForm
        mode={mode}
        formObject={formObject}
        onInputChange={handleInputChange}
        onDelete={onDeleteClick}
        onSave={onSaveClick}
        onCancel={onCancelClick}
      />
    </div>
  );
}

export default App;

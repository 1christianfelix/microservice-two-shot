import React from "react";

const DeleteButton = (props) => {
  // props.href
  let url = null;
  if (props.href.includes("shoes")) {
    url = `http://localhost:8080${props.href}`;
  } else {
    url = `http://localhost:8090${props.href}`;
  }

  async function deleteItem() {
    // props.href
    try {
      const response = await fetch(url, { method: "delete" });
      if (response.ok) {
        console.log("Deleted");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button type="button" onClick={deleteItem} className="btn btn-danger">
      Exile this poor item?
    </button>
  );
};

export default DeleteButton;

import React from "react";

const DeleteButton = (props) => {
  async function deleteHat() {
    // props.href
    const id = props.href.match(/(\d+)/)[0];
    const url = `http://localhost:8090/api/hats/${id}/`;
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
    <button type="button" onClick={deleteHat} className="btn btn-danger">
      Danger
    </button>
  );
};

export default DeleteButton;

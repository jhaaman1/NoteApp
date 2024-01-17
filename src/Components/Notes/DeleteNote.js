import React from "react";
import { MdDelete } from "react-icons/md";
import NoteServices from "../../Services/NoteServices";

const DeleteNote = ({ task }) => {
  const handleDelete = (e) => {
    e.preventDefault();

    NoteServices.IsDeleteNotes(task._id)
      .then((response) => {
        alert("Note Deleted Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <MdDelete onClick={(e) => handleDelete(e, task._id)} />
    </div>
  );
};

export default DeleteNote;

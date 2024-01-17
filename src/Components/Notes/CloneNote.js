import React from "react";
import { FaClone } from "react-icons/fa";
import NoteServices from "../../Services/NoteServices";

const CloneNote = ({ task }) => {
  const handleClone = (e, id) => {
    e.preventDefault();

    NoteServices.IsCloneNotes(task._id)
      .then((response) => {
        alert("Note Cloned Successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <FaClone onClick={(e) => handleClone(e, task._id)} />
    </div>
  );
};

export default CloneNote;

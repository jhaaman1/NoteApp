import React, { useState } from "react";
import { MdEditDocument } from "react-icons/md";

const EditNote = ({ task, handleUpdate }) => {
  const [editNote, setEditNote] = useState(null);
  const [editText, setEditText] = useState("");

  const localHandleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      await handleUpdate(id, { user: editText });
      setEditNote(null);
      setEditText("");
    } catch (error) {
      console.error("Update Request Error:", error);
    }
  };

  const handleEdit = (e, id, text) => {
    e.preventDefault();
    setEditNote(id);
    setEditText(text);
  };

  return (
    <div>
      {" "}
      {editNote === task._id ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={(e) => localHandleUpdate(e, task._id)}>Update</button>
        </>
      ) : (
        <MdEditDocument onClick={(e) => handleEdit(e, task._id, task.user)} />
      )}
    </div>
  );
};

export default EditNote;

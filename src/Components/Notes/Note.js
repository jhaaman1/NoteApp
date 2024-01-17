import React, { useState } from "react";
import todoStyles from "./Note.module.css";
import NoteServices from "../../Services/NoteServices";
import { NoteList } from "./NoteList";

export const Note = () => {
  const [text, setText] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await NoteServices.postNotesData({
        user: text,
      });
      window.location.reload();
    } catch (error) {
      console.error("POST Request Error:", error);
    }
  };

  return (
    <div className={todoStyles.mainContainer}>
      <h1>Todo List</h1>
      <div className={todoStyles.container}>
        <div className={todoStyles.imageTodo}>
          <img
            src="https://intellsys-optimizer.b-cdn.net/interviews/978ea909-91ec-49c2-bd69-d494c097d38d/header.jpg"
            alt="images"
          />
          <h1>NOTES</h1>
        </div>
        <form className={todoStyles.inputBox} onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Your Note"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className={todoStyles.buttons}>
            Add
          </button>
        </form>
        <NoteList name={text} />
      </div>
    </div>
  );
};

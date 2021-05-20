import axios from "axios";
import { useState } from "react";
import { APIURL } from "../Utilities";

export const NotesCard = ({ item, setNotes }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [editMode, setEditMode] = useState(false);

  const saveEditedNote = async () => {
    try {
      const {
        data: { note }
      } = await axios.post(`${APIURL}/notes/${item._id}`, {
        title,
        description
      });
      console.log("note from db", note);
      setNotes((notes) =>
        notes.map((item) => (item._id === note._id ? note : item))
      );
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async () => {
    try {
      const {
        data: { note }
      } = await axios.delete(`${APIURL}/notes/${item._id}`);
      setNotes((notes) => notes.filter((item) => item._id !== note._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={"note-card-wrapper"}>
      <p className="small">{item.notedAt}sec</p>
      {!editMode ? (
        <>
          <h2 style={{ color: "white" }}>{item.title}</h2>
          <p style={{ color: "white" }}>{item.description}</p>
        </>
      ) : (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </>
      )}
      <div className="note-card-btns-wrapper">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="btn btn-primary note-btn"
          >
            <i className="far fa-edit"></i>
          </button>
        ) : (
          <button onClick={() => saveEditedNote()} className="note-btn">
            <i className="fas fa-check"></i>
          </button>
        )}
        <button onClick={() => deleteNote()} className="note-btn">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

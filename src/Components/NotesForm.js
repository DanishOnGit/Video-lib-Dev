import { useEffect, useState } from "react";
import { NotesCard } from "./NotesCard";

export const NotesForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  const saveNote = () => {
    setNotes((prev) =>
      prev.concat([{ title: title, description: description }])
    );
    setTitle("");
    setDescription("");
  };

  const discardNote = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="notes-form-wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="note-form">
        <h2>Notes</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="note-title"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="note-description"
          placeholder="Description"
        ></textarea>

        <button onClick={saveNote} className="btn btn-primary save">
          Save
        </button>
        <button
          onClick={discardNote}
          className="btn btn-outline-secondary discard"
        >
          Discard
        </button>
      </form>

      <ul className="list-non-bullet">
        {notes.map((item) => (
          <li>
            <NotesCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

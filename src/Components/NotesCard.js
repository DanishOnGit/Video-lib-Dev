import { useState } from "react";

export const NotesCard = ({ item }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [editDisbaled, setEditDisabled] = useState(true);
  const [removed, setRemoved] = useState(false);

  return (
    <div
      className={removed ? "note-card-wrapper removed" : "note-card-wrapper"}
    >
      <input
        disabled={editDisbaled}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        disabled={editDisbaled}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="note-card-btns-wrapper">
        <button
          onClick={() => setEditDisabled(false)}
          className="btn btn-primary note-btn"
        >
          <i class="far fa-edit"></i>
        </button>
        <button onClick={() => setEditDisabled(true)} className="note-btn">
          <i class="fas fa-check"></i>
        </button>
        <button onClick={() => setRemoved(true)} className="note-btn">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

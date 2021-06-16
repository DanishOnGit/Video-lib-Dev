import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Contexts";
import { APIURL } from "../Utilities";
import { NotesCard } from "./NotesCard";

export const NotesForm = ({ videoRef }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const { isLoggedIn, userToken } = useAuth();
  const { videoId } = useParams();

  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          const {
            data: { notes }
          } = await axios({
            method: "GET",
            url: `${APIURL}/notes`,
            headers: {
              Authorization: userToken,
              videoId
            }
          });
          setNotes(notes);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isLoggedIn]);

  const convertTimeToString = (time) => {
    time = Number(time);
    if (time >= 3600) {
      return `${Math.floor(time / 3600)}:${Math.floor(
        (time % 3600) / 60
      )}:${Math.floor(time % 60)}`;
    }
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
  };

  const saveNote = async () => {
    try {
      if (title && description) {
        const time = convertTimeToString(videoRef.current.getCurrentTime());
        const {
          data: { note }
        } = await axios({
          method: "POST",
          url: `${APIURL}/notes`,
          data: {
            title,
            description,
            videoId: videoId,
            notedAt: time
          }
        });

        setNotes((notes) => notes.concat(note));
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const discardNote = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="notes-form-wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="note-form">
        <h2 className="form-heading">Notes</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="note-title"
          type="text"
          placeholder="Title"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="note-description"
          placeholder="Description"
          required
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
            <NotesCard item={item} setNotes={setNotes} />
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from "react";
import { toast } from "react-toastify";
import { X, Plus, RotateCcw } from "react-feather";
import "./../scss/main.scss";

const Notes = ({}) => {
    const [notes, setNotes] = React.useState([]);
    const [note, setNote] = React.useState("");
    const [ignore, setIgnored] = React.useState(0);

    const forceUpdate = React.useCallback(() => setIgnored((v) => v + 1), []);

    let localdata = JSON.parse(localStorage.getItem("userDetails"));
    let user = localdata
        ? localdata
        : {
              fname: "",
              lname: "",
              email: "",
              password: "",
              _id: "0",
          };
    let { _id } = user;

    let userType = JSON.parse(localStorage.getItem("user_type"));

    const addNewNote = () => {
        // if (!note.length) {
        //   toast.error("Please write something");
        //   return;
        // }

        fetch("http://localhost:4000/note", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                user_id: _id,
                user_type: userType,
                content: note,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                   // console.log("Added a new note");
                   toast.success("Added a new note");
                } else {
                    // console.log(
                    //     "Note cannot be added at the moment. Please try again later!"
                    // );
                }
                setNote("");
                forceUpdate();
            })
            .catch(() => toast.error("Unable to add note"));
    };
    const deleteNote = (id) => {
        fetch(`http://localhost:4000/note/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Note deleted");
                } else {
                    toast.error("Unable to delete note");
                }
                setNote("");
                forceUpdate();
            })
            .catch(() => toast.error("Unable to delete note"));
    };

    React.useEffect(() => {
        fetch(`http://localhost:4000/note/${userType}/${_id}`, {
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    console.log("Could not fetch notes");
                }
            })
            .then((data) => {
                //console.log(data.data);
                setNotes(data.data);
            })
            .catch(() => console.log("Could not fetch notes"));

        //console.log(notes);
    }, [ignore, note]);

    const NoteBox = ({ date, content, id, deleteNote }) => {
        let parsedDate = new Date(date).toDateString();
        let parsedTime = new Date(date).toLocaleTimeString();
        return (
            <div className="notes-box">
                <div className="notes-box-up">
                    <div className="flex-row">
                        <p>
                            {parsedDate} {parsedTime}
                        </p>
                    </div>
                    <X
                        size={18}
                        className={"sub trashcan"}
                        onClick={() => deleteNote(id)}
                    />
                </div>
                <h6 className="changeColor">{content}</h6>
            </div>
        );
    };

    return (
        <div
            className={"background course-container"}
            style={{ height: window.innerHeight + 60 }}
        >
            <div style={{ height: window.innerHeight + 60, width: "100%" }}>
                <h2
                    className="course-title"
                    style={{ fontSize: 40, marginTop: 20 }}
                >
                    My Notes
                </h2>
                <p className="text-note">Add a new note</p>
                <div className="flex-row">
                    <input className="input-text"
                        type="text"
                        style={{ height: 60, fontSize: 25 }}
                        value={note}
                        onChange={(t) => {
                            setNote(t.target.value);
                        }}
                        autoFocus
                        maxLength={200}
                    ></input>
                    <button onClick={addNewNote} className="add-btn">
                        <Plus size={40} color="#fff" />
                    </button>
                </div>
                <div className="delete-note">
                    {notes.map((note, index) => {
                        return (
                            <NoteBox
                                date={note.createdAt}
                                content={note.content}
                                id={note._id}
                                key={index}
                                deleteNote={(id) => deleteNote(id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notes;

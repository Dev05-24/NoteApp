import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/notesSlice";
import toast from "react-hot-toast";
import { Pencil, Eye, Trash2, Copy } from "lucide-react";
import { Link } from "react-router-dom";

const Notes = () => {
  const notes = useSelector((state) => state.note?.notes);
  // console.log(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  //how we gonna find the filtered data we have all the notes go to them apply this filter criteria and for each notes check this condition given below
  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(notesId) {
    dispatch(removeFromNotes(notesId));
  }

  return (
    <div className="rounded-lg">
      <input
        className="p-2 rounded-lg min-w-[600px] text-lg font-semibold mt-2 text-center w-full outline-none"
        type="search"
        placeholder="Search Notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {/* according to filtered data i want to add card here */}
        {filteredData.length > 0 ? (
          filteredData.map((note) => {
            return (
              <div
                className="border bg-white flex justify-between rounded-xl"
                key={note?._id}
              >
                <div className="p-2 flex flex-col items-start">
                  <div className="text-xl font-bold text-blue-600">{note.title}</div>
                  <div className="text-md">{note.content}</div>
                </div>

                <div className="flex flex-col justify-around p-2">
                  <div className="flex flex-row gap-6 place-content-evenly">
                    <button className="transition-transform duration-200 hover:scale-110">
                      <Link to={`/?notesId=${note?._id}`}>
                        <Pencil title="Copy title" />
                      </Link>
                    </button>
                    <button className="transition-transform duration-200 hover:scale-110">
                      <Link to={`/notes/${note?._id}`}>
                        <Eye title="View note" />
                      </Link>
                    </button>
                    <button
                      className="transition-transform duration-200 hover:scale-110"
                      onClick={() => handleDelete(note?._id)}
                    >
                      <Trash2 title="Delete note" />
                    </button>
                    <button
                      className="transition-transform duration-200 hover:scale-110"
                      onClick={() => {
                        navigator.clipboard.writeText(note?.title);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <Copy title="copy title" />
                    </button>
                  </div>
                  <div>{new Date(note.createdAt).toLocaleString()}</div>
                </div>
              </div>
            );
          })
        ) : notes.length > 0 && filteredData.length === 0 ? (
          <div className="text-center mt-10 text-xl">
            No Notes found matching {""}
            <span className="font-bold text-blue-600">{searchTerm}</span>
            <br />
            <Link to="/" className="underline font-bold">
              Create a new one
            </Link>
          </div>
        ) : (
          <div className="text-center mt-10 text-xl">
            No notes available
            <br />
            <Link to="/" className="underline font-bold">
              Create one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;

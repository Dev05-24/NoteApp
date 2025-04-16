import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewNotes = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.note.notes);
  const note = allNotes.find((p) => p._id === id);
  console.log("Final notes", note);

  return (
    <div className="rounded-lg">
      <div className="flex flex-row w-full rounded-lg">
        <input
          className="pl-4 py-1.5 rounded-lg sm:w-full focus:outline-none focus:ring-2 focus:ring-black text-lg font-semibold bg-white border-blue-300  shadow-md"
          type="text"
          placeholder="Enter title here"
          value={note.title}
          disabled
        />
      </div>
      <div>
        <textarea
          className="rounded-lg mt-2 p-4 w-full focus:outline-none bg-white border-blue-300  shadow-md"
          value={note.content}
          rows={15}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewNotes;

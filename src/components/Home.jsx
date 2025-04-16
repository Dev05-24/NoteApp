import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../redux/notesSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const[title, setTitle] = useState("");
  const[value, setValue] = useState('');
  const[searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId"); //this is how i'm gonna find the notesId
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.note.notes);
  const navigate = useNavigate();

  useEffect(() =>{
    console.log("inside useEffect");
    if(notesId){
      const note = allNotes.find((p) => p._id === notesId);
      if(note){
        console.log("Page found");
        setTitle(note.title);
        setValue(note.content)
      }
    }
  },[notesId, allNotes]);

  //this function responsiblity is to create a note and send it to slice
  function createNotes(){
    //let's create a notes
    const notes = {
      title : title,
      content : value,
      //generating id base on date
      _id: notesId || Date.now().toString(36),
      createdAt:new Date().toLocaleString(),
    }


    if(notesId){
      const existingNote = allNotes.find((p) => p._id === notesId);
      if(existingNote && (existingNote.title !== notes.title || existingNote.content !== notes.content)){
        //update
        dispatch(updateToNotes(notes));
      }else{
        toast("No changes made",{ icon: "⚠️" });
      }
    }else{
      //create
      dispatch(addToNotes(notes));
    }
    //after creation and updation we need to clear the input
    setTitle('');
    setValue('');
    setSearchParams('');
    navigate("/notes");
  }

  return (
    <div>
    <div className='flex flex-col sm:flex-row gap-4 items-center rounded-lg w-full'>
      <input 
        className='pl-4 py-1.5 rounded-lg w-full sm:w-3/4 text-lg font-semibold bg-white border-blue-300 shadow-md outline-none'
        type="text" 
        placeholder='Enter title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <button 
        className='px-4 py-2 rounded-lg bg-white font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors w-full mt-2 sm:mt-0 sm:w-1/4 cursor-pointer shadow-md'
        onClick={createNotes}
        disabled={title.length < 3 || value.length < 3}
      >
        {
          notesId ? "Update My Notes" : "Create Notes"
        }
        </button>
    </div>
    <div>
      <textarea 
        className='rounded-lg mt-3 p-4 w-full focus:outline-none bg-white text-gray-800 shadow-md'
        value={value}
        placeholder='Enter the content here'
        onChange={(e) => setValue(e.target.value)}
        rows={15}
      />
      {title.length > 0 && title.length < 3 && (
  <p className=" text-lg mt-1 font-semibold">Title must be at least 3 characters long.</p>
)}
      {value.length > 0 && value.length < 10 && (
  <p className=" text-lg mt-1 font-semibold">Content must be at least 10 characters long.</p>
)}
    </div>
    </div>
  )
}

export default Home

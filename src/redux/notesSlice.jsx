import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
     
  notes:localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : []
}

export const notesSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
      const note = action.payload;
      //add a check -> notes already exist 
      state.notes.push(note);   //saving the notes in the state
      localStorage.setItem("notes",JSON.stringify(state.notes));  //saving the notes in the localstorage
      toast.success("Notes created successfully");
    },
    updateToNotes: (state,action) => {
      //i am getting the payload according to that payload i will check that this note which i have to update is it already present in my state or not using id
      const note = action.payload;
      //here i am getting the index
      const index = state.notes.findIndex((item) => item._id === note._id);

      if(index >= 0){
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Notes updated");
      }
    },
    resetAllNotes: (state, action) => {
      //assigning the state to an empty array
      state.notes = [];
      //removing all the item from the localstorage
      localStorage.removeItem("notes");
    },
    removeFromNotes: (state, action) =>{
      const notesId = action.payload;
      console.log(notesId);
      //finding the index
      const index = state.notes.findIndex((item) => item._id === notesId);
      //if exist then delete using splice
      if(index >= 0){
        //deleting the notes from the state
        state.notes.splice(index,1);

        //updating the new state to the localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes));

        toast.success("Notes deleted");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = notesSlice.actions

export default notesSlice.reducer
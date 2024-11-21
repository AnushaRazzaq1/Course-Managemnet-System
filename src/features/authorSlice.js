import { createSlice } from "@reduxjs/toolkit";

const loadAuthorsFromLocalStorage = () => {
  const savedAuthors = localStorage.getItem("authors");
  return savedAuthors ? JSON.parse(savedAuthors) : [];
};

const saveAuthorsToLocalStorage = (authors) => {
  localStorage.setItem("authors", JSON.stringify(authors));
};

const initialState = {
  authors: loadAuthorsFromLocalStorage(),
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    addAuthor: (state, action) => {
      const newAuthor = { id: Date.now(), ...action.payload };
      state.authors.push(newAuthor);
      saveAuthorsToLocalStorage(state.authors);
    },
    deleteAuthor: (state, action) => {
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload
      );
      saveAuthorsToLocalStorage(state.authors);
    },
  },
});

export const { addAuthor, deleteAuthor } = authorSlice.actions;
export default authorSlice.reducer;

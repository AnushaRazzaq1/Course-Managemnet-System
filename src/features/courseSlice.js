import { createSlice } from '@reduxjs/toolkit';
const loadCoursesFromLocalStorage = () => {
  const courses = localStorage.getItem('courses');
  return courses ? JSON.parse(courses) : []; 
};

const saveCoursesToLocalStorage = (courses) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

const initialState = {
  courses: loadCoursesFromLocalStorage(), 
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = { id: Date.now(), ...action.payload };
      state.courses.push(newCourse);
      saveCoursesToLocalStorage(state.courses);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
        saveCoursesToLocalStorage(state.courses); 
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
      saveCoursesToLocalStorage(state.courses); 
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;

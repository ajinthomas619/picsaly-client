import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/userRoutes";
import './globals.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
   
      <Toaster/>
    </>
  );
}

export default App;

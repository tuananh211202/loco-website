import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const GuestRoutes = () => {
  return (
    <Routes>
      <Route index path='/signin' element={<SignIn />} />
      <Route index path='/signup' element={<SignUp />} />
    </Routes>
  );
};
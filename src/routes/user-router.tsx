import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import PeoplePage from "../pages/People";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' index element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/people' index element={<PeoplePage />} />
    </Routes>
  );
};
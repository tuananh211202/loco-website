import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import PeoplePage from "../pages/People";
import { InfomationSettingPage } from "../pages/Setting/information";
import { AvataSettingPage } from "../pages/Setting/avatar";
import { PasswordSettingPage } from "../pages/Setting/password";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' index element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/people' index element={<PeoplePage />} />
      <Route path='/update/information' index element={<InfomationSettingPage />} />
      <Route path='/update/avatar' index element={<AvataSettingPage />} />
      <Route path='/update/password' index element={<PasswordSettingPage />} />
    </Routes>
  );
};
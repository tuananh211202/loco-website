import { UserRoutes } from "../../../routes/user-router";
import MessageBox from "../../MessageBox";
import PostDetails from "../../PostDetails";

export const MainContent = () => {
  return <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <UserRoutes />
    <MessageBox />
    <PostDetails />
  </div>;
}
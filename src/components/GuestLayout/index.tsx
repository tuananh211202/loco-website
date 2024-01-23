import { GuestRoutes } from "../../routes/guest-router";

const GuestLayout = () => {
  return <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
    <GuestRoutes />
  </div>;
}

export default GuestLayout;
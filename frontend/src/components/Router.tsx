import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./screens/Home/Home";
import PaymentSuccess from "./screens/SuccessPayment";
import Login from "./screens/user/auth/Login";
import Register from "./screens/user/auth/Register";
import Profile from "./screens/user/profile/Profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
};

export default Router;

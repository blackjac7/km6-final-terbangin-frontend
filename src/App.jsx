import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Search from "./pages/search/search";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import Profile from "./pages/profile/profile";
import OtpVerification from "./pages/otp/otpVerification";
import RequestResetPassword from "./pages/requestResetPassword/requestResetPassword";
import VerificationLink from "./pages/verificationLink/verificationLink";
import FindTicket from "./pages/findTicket";
import OrderHistoryPages from "./pages/orderHistory";
import Payment from "./pages/payment";

import ProtectedVerification from "./components/ProtectedVerification/ProtectedVerification";
import ProtectedForgetPassword from "./components/ProtectedForgetPassword/ProtectedForgetPassword";
import Protected from "./components/Protected";
import NonProtected from "./components/NonProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NonProtected>
        <Navbar />
        <Home />
      </NonProtected>
    ),
  },
  {
    path: "/login",
    element: (
      <NonProtected>
        <LoginPage />
      </NonProtected>
    ),
  },
  {
    path: "/register",
    element: (
      <NonProtected>
        <RegisterPage />
      </NonProtected>
    ),
  },

  {
    path: "/profile",
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
  {
    path: "/verification",
    element: (
      <ProtectedVerification>
        <OtpVerification />
      </ProtectedVerification>
    ),
  },
  {
    path: "/request-reset-password",
    element: (
      <NonProtected>
        <RequestResetPassword />,
      </NonProtected>
    ),
  },
  {
    path: "/verify-link",
    element: (
      <NonProtected>
        <VerificationLink />,
      </NonProtected>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <ProtectedForgetPassword>
        <ForgetPassword />
      </ProtectedForgetPassword>
    ),
  },
  {
    path: "/find-ticket",
    element: (
      //   <ProtectedForgetPassword>
      <>
        <Navbar />
        <FindTicket />
      </>
      //   </ProtectedForgetPassword>
    ),
  },
  {
    path: "/order-history",
    element: (
      <>
        {/* <ProtectedForgetPassword> */}
        <Navbar />
        <OrderHistoryPages />
        {/* </ProtectedForgetPassword> */}
      </>
    ),
  },
  {
    path: "/payment",
    element: (
      <>
        {/* <ProtectedForgetPassword> */}
        <Navbar />
        <Payment />
        {/* </ProtectedForgetPassword> */}
      </>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
        <ToastContainer theme="colored" />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;

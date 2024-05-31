import FindTicketPages from "./pages/findTicket";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css"; // apply bootstrap for styling
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/find-ticket",
    element: <FindTicketPages />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

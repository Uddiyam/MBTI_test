import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Testpage from "./Testpage";

const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route exact path="/" element={<Testpage />} />
      </>
    </Routes>
  );
};

export default AppRouter;

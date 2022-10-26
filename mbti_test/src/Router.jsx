import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ResultPage from "./ResultPage";
import Testpage from "./Testpage";

const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route exact path="/" element={<Testpage />} />
        <Route exact path="/Result" element={<ResultPage />} />
      </>
    </Routes>
  );
};

export default AppRouter;

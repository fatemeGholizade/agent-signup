
import { Route, Routes } from "react-router-dom";
import MainPage from "./mainPage";
const Pages = () => {
  return (
        <Routes >
          <Route path="/" element={<MainPage />} />
        </Routes>
  );
}
export default Pages;

import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import HatList from "./HatList";
import HatForm from "./HatForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="shoes">
          <Route index element={<ShoeList />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
        <Route path="hats">
          <Route index element={<HatList />} />
          <Route path="new" element={<HatForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

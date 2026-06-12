import { BrowserRouter, Routes, Route } from "react-router";
import { MainSite } from "./MainSite";
import { Admin } from "./admin/Admin";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
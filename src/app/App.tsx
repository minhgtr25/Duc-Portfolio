import { BrowserRouter, Routes, Route } from "react-router";
import { MainSite } from "./MainSite";
import { Admin } from "./admin/Admin";
import { DataProvider } from "./context/DataContext";
import { Toaster } from 'sonner';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" richColors position="top-right" />
    </DataProvider>
  );
}
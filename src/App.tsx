import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout";
import PhotoDetail from "./components/PhotoDetail";
import PhotoGallery from "./components/PhotoGallery";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route path="/photos" element={<PhotoGallery />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </Layout>
    </Router>
  </QueryClientProvider>
  );
}

export default App;

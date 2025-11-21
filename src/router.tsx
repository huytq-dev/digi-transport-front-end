import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/index";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing-page" element={<LandingPage />} />
      {/* Add more routes here */}
      {/* Example:
        <Route path="/users" element={<UserPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      */}
    </Routes>
  );
};

import { Routes, Route } from 'react-router-dom';

// Temporary home component - replace with your actual pages
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Transport App</h1>
      <p>Add your pages in src/pages/ and import them here</p>
    </div>
  );
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes here */}
      {/* Example:
        <Route path="/users" element={<UserPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      */}
    </Routes>
  );
};

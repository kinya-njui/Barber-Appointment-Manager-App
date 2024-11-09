import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/Header/Header";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import AllBlogsPage from "./Pages/AllBlogsPage/AllBlogsPage";
import Writing from "./components/Write/Write";
import FullBlogPage from "./Pages/FullBlogPage/FullBlogPage";
import FeedPage from "./Pages/FeedPage/FeedPage";
import UpdateBlogPage from "./Pages/UpdateBlogPage/UpdateBlogPage";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/write" element={<Writing />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<AllBlogsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/full-blog/:id" element={<FullBlogPage />} />
          <Route path="/writer-feed" element={<FeedPage />} />
          <Route path="/update-blog/:id" element={<UpdateBlogPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

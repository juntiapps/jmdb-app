import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import AppNav from "../components/AppNav";
import SearchResults from "../pages/SearchResults";
import VideoGallery from "../pages/VideoGallery";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/movie/:id/videogallery" element={<VideoGallery />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

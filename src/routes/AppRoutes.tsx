import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import AppNav from "../components/AppNav";
import SearchResults from "../pages/SearchResults";
import VideoGallery from "../pages/VideoGallery";
import PhotoGallery from "../pages/PhotoGallery";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/movie/:id/videogallery" element={<VideoGallery />} />
                <Route path="/movie/:id/photogallery" element={<PhotoGallery />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

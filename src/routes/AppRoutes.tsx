import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import AppNav from "../components/AppNav";
import SearchResults from "../pages/SearchResults";
import VideoGallery from "../pages/VideoGallery";
import PhotoGallery from "../pages/PhotoGallery";
import Interests from "../pages/Interests";
import NotFoundPage from "../pages/404";
import InterestDetail from "../pages/InterestDetail";
import NameDetail from "../pages/NameDetail";
import NamePhotoGallery from "../pages/NamePhotoGallery";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AppNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/movie/:id/videogallery" element={<VideoGallery />} />
                <Route path="/movie/:id/photogallery" element={<PhotoGallery />} />
                <Route path="/interest" element={<Interests />} />
                <Route path="/interest/:id" element={<InterestDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/name/:id" element={<NameDetail />} />
                <Route path="/name/:id/photogallery" element={<NamePhotoGallery />} />

                {/* Fallback 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

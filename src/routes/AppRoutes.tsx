import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Header from "../components/Header";
import SearchResults from "../pages/SearchResults";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

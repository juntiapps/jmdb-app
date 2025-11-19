import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, TextField, InputAdornment } from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { useColorMode } from "../theme/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const { mode, toggleMode } = useColorMode();

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <AppBar position="sticky" elevation={2}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        color: mode === "light" ? "#000" : "#f5c518",
                        mr:1
                    }}
                >
                    JMDb
                </Typography>

                {/* Search Bar */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ flexGrow: 1, maxWidth: 400 }}
                >
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search movies..."
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={toggleMode} color="inherit">
                        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

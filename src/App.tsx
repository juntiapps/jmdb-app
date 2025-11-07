import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ColorModeProvider } from "./theme/ThemeContext";

const App: React.FC = () => {
  return (
    <ColorModeProvider>
      <AppRoutes />
    </ColorModeProvider>
  );
};

export default App;

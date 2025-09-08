// src/App.jsx
// src/App.jsx
// src/App.jsx
// src/App.jsx
// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { NotificationProvider } from "./providers/NotificationProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx"; // ✅ import

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* ✅ wrap here */}
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

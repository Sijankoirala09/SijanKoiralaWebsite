import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import App from "./App.jsx";
import "./styles.css";

const root = document.getElementById("root");
if (root.children.length) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

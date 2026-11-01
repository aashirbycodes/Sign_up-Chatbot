import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from '@clerk/react'
import ChatBoat from "./Pages/Chatbot.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider appearance={"dark"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/chatboat" element={<ChatBoat />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)


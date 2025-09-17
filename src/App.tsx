import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EditorPage from 'pages/EditorPage/EditorPage';
import HomePage from 'pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

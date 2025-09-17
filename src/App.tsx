import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EditorPage from 'pages/EditorPage/EditorPage';
import HomePage from 'pages/HomePage/HomePage';
import { Toaster } from 'shared/ui/common/Toaster';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;

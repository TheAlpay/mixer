import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LibraryPage from './pages/LibraryPage';
import LibraryDetailPage from './pages/LibraryDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import MixerPage from './pages/MixerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/hakkimizda"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/iletisim"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/kutuphane"
          element={
            <Layout>
              <LibraryPage />
            </Layout>
          }
        />
        <Route
          path="/kutuphane/:id"
          element={
            <Layout>
              <LibraryDetailPage />
            </Layout>
          }
        />
        <Route
          path="/sozluk"
          element={
            <Layout>
              <DictionaryPage />
            </Layout>
          }
        />
        <Route
          path="/mixer"
          element={
            <Layout>
              <MixerPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

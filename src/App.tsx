import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FraudWarningModal from './components/FraudWarningModal';
import Home from './pages/Home';
import About from './pages/About';
import Agents from './pages/Agents';
import Submissions from './pages/Submissions';
import Deals from './pages/Deals';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import Network from './pages/Network';
import NetworkGenre from './pages/NetworkGenre';
import NetworkThread from './pages/NetworkThread';

function getRoute(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  let page: React.ReactNode;

  // Network routes: /network, /network/:genre, /network/:genre/thread/:id
  const threadMatch = route.match(/^\/network\/([a-z-]+)\/thread\/(\d+)$/);
  const genreMatch = route.match(/^\/network\/([a-z-]+)$/);

  if (threadMatch) {
    page = <NetworkThread genre={threadMatch[1]} threadId={Number(threadMatch[2])} />;
  } else if (genreMatch) {
    page = <NetworkGenre genre={genreMatch[1]} />;
  } else {
    switch (route) {
      case '/about':
        page = <About />;
        break;
      case '/agents':
        page = <Agents />;
        break;
      case '/submissions':
        page = <Submissions />;
        break;
      case '/deals':
        page = <Deals />;
        break;
      case '/faqs':
        page = <Faqs />;
        break;
      case '/contact':
        page = <Contact />;
        break;
      case '/network':
        page = <Network />;
        break;
      default:
        page = <Home />;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header route={route} />
      <main className="flex-1">{page}</main>
      <Footer />
      <FraudWarningModal />
    </div>
  );
}

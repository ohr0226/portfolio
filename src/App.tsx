import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import Visual from './sections/Visual';
import Intro from './sections/Intro';
import Project from './sections/Project';
import Goal from './sections/Goal';
import Contact from './sections/Contact';
import { usePortfolioAnimation } from './hooks/usePortfolioAnimation';

export default function App() {
  usePortfolioAnimation();

  return (
    <>
      <Loading />
      <div id="wrapper">
        <div className="cursor">
          <span>View more</span>
        </div>
        <div className="background"></div>
        <Header />
        <main className="container">
          <Visual />
          <Intro />
          <Project />
          <Goal />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

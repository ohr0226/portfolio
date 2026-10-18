import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import ProjectDetail from './pages/ProjectDetail';
import { useCursor } from './hooks/useCursor';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const route = useHashRoute();
  // 사이트를 메인으로 처음 열었을 때만 로딩 화면을 보여줌
  const isFirstMain = useRef(route.name === 'main');
  useCursor();

  useEffect(() => {
    // 페이지 전환 시 이전 페이지에서 남은 커서 / 헤더 상태 초기화
    document.querySelector('.cursor')?.classList.remove('cursor-over', 'img-over');
    document.querySelector('.header')?.classList.remove('active');
    if (route.name === 'main') return () => void (isFirstMain.current = false);
  }, [route]);

  return (
    <div id="wrapper">
      <div className="cursor">
        <span>View more</span>
      </div>
      <Header />
      {route.name === 'project' ? (
        <ProjectDetail key={route.id} id={route.id} />
      ) : (
        <Main withLoading={isFirstMain.current} />
      )}
      <Footer />
    </div>
  );
}

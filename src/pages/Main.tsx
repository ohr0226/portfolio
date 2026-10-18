import { useState } from 'react';
import Loading from '../components/Loading';
import Visual from '../sections/Visual';
import Intro from '../sections/Intro';
import Project from '../sections/Project';
import Goal from '../sections/Goal';
import Contact from '../sections/Contact';
import { usePortfolioAnimation } from '../hooks/usePortfolioAnimation';

interface Props {
  /** 첫 진입일 때만 로딩 화면 노출 (상세에서 돌아온 경우 생략) */
  withLoading: boolean;
}

export default function Main({ withLoading }: Props) {
  // 렌더링 도중 값이 바뀌어도 처음 마운트 기준으로 고정
  const [showLoading] = useState(withLoading);
  usePortfolioAnimation({ withLoading: showLoading });

  return (
    <>
      {showLoading && <Loading />}
      <div className="background"></div>
      <main className="container">
        <Visual />
        <Intro />
        <Project />
        <Goal />
        <Contact />
      </main>
    </>
  );
}

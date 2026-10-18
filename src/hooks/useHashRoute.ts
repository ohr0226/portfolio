import { useEffect, useState } from 'react';

/**
 * GitHub Pages 에서 새로고침/공유가 가능하도록 해시 기반으로 페이지를 구분
 * - #/project/{id} → 프로젝트 상세
 * - 그 외          → 메인
 */
export type Route = { name: 'main' } | { name: 'project'; id: string };

const parse = (hash: string): Route => {
  const match = hash.match(/^#\/project\/([\w-]+)/);
  return match ? { name: 'project', id: match[1] } : { name: 'main' };
};

export const projectPath = (id: string) => `#/project/${id}`;

/** 상세에서 메인으로 돌아왔을 때 보던 카드로 스크롤하기 위해 마지막으로 연 프로젝트 id 를 기억 */
export const lastViewed: { id: string | null } = { id: null };

export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

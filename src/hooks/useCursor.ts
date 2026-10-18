import { useEffect } from 'react';
import gsap from 'gsap';

type Cleanup = () => void;

/**
 * [data-hover] 등 hover 대상에 mouseenter/mouseleave 를 이벤트 위임으로 처리
 * → 탭 전환, 페이지 전환으로 나중에 렌더링된 요소에도 동작
 */
function delegateHover(selector: string, enter: (el: HTMLElement) => void, leave: (el: HTMLElement) => void): Cleanup {
  const handle = (e: MouseEvent, fn: (el: HTMLElement) => void) => {
    const el = (e.target as Element).closest<HTMLElement>(selector);
    // 같은 요소 내부(자식 간) 이동은 무시
    if (el && !el.contains(e.relatedTarget as Node | null)) fn(el);
  };
  const onOver = (e: MouseEvent) => handle(e, enter);
  const onOut = (e: MouseEvent) => handle(e, leave);
  document.addEventListener('mouseover', onOver);
  document.addEventListener('mouseout', onOut);
  return () => {
    document.removeEventListener('mouseover', onOver);
    document.removeEventListener('mouseout', onOut);
  };
}

/** 커스텀 커서 (PC 전용) — 메인 / 상세 페이지 공통 */
export function useCursor() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const cursor = document.querySelector<HTMLElement>('.cursor');
      const onMove = (e: MouseEvent) => {
        gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.2 });
      };
      window.addEventListener('mousemove', onMove);

      const cursorHover = (selector: string, cursorClass: string) =>
        delegateHover(
          selector,
          (el) => {
            cursor?.classList.add(cursorClass);
            el.classList.add('active');
          },
          (el) => {
            cursor?.classList.remove(cursorClass);
            el.classList.remove('active');
          },
        );
      const cleanups = [cursorHover('[data-hover]', 'cursor-over'), cursorHover('[data-img]', 'img-over')];

      return () => {
        window.removeEventListener('mousemove', onMove);
        cleanups.forEach((fn) => fn());
      };
    });

    return () => mm.revert();
  }, []);
}

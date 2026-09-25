import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Cleanup = () => void;

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  Array.from(document.querySelectorAll<T>(selector));

/** addEventListener 후 해제 함수를 반환 */
function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Window | Document | null,
  type: K,
  handler: (e: HTMLElementEventMap[K]) => void,
): Cleanup {
  if (!target) return () => {};
  target.addEventListener(type, handler as EventListener);
  return () => target.removeEventListener(type, handler as EventListener);
}

/** jQuery .hover() 대체 */
function hover(target: HTMLElement, enter: () => void, leave: () => void): Cleanup {
  const offEnter = on(target, 'mouseenter', enter);
  const offLeave = on(target, 'mouseleave', leave);
  return () => {
    offEnter();
    offLeave();
  };
}

/**
 * [data-hover] 등 hover 대상에 mouseenter/mouseleave 를 이벤트 위임으로 처리
 * → 탭 전환 등으로 나중에 렌더링된 요소에도 동작
 */
function delegateHover(selector: string, enter: (el: HTMLElement) => void, leave: (el: HTMLElement) => void): Cleanup {
  const handle = (e: MouseEvent, fn: (el: HTMLElement) => void) => {
    const el = (e.target as Element).closest<HTMLElement>(selector);
    // 같은 요소 내부(자식 간) 이동은 무시
    if (el && !el.contains(e.relatedTarget as Node | null)) fn(el);
  };
  const offOver = on(document, 'mouseover', (e) => handle(e, enter));
  const offOut = on(document, 'mouseout', (e) => handle(e, leave));
  return () => {
    offOver();
    offOut();
  };
}

/** jQuery .offset().top 대체 */
const offsetTop = (el: HTMLElement | null) => (el ? el.getBoundingClientRect().top + window.scrollY : 0);

/** 스크롤 위치가 기준점을 넘으면 header 에 active 클래스 */
function headerToggle(getThreshold: () => number): Cleanup {
  const header = $('.header');
  return on(window, 'scroll', () => {
    header?.classList.toggle('active', window.scrollY >= getThreshold());
  });
}

/** 영역 위에서 마우스를 움직이면 target 이 따라 움직이는 효과 */
function magnetic(areaSelector: string, targetSelector: string): Cleanup[] {
  const area = $(areaSelector);
  if (!area) return [];
  return [
    on(area, 'mousemove', (e) => {
      const x = (-area.offsetWidth / 2 + e.offsetX) * 0.3;
      const y = (-area.offsetHeight / 2 + e.offsetY) * 0.3;
      gsap.to(targetSelector, { transform: `translate(${x}px,${y}px)` });
    }),
    on(area, 'mouseout', () => {
      gsap.to(targetSelector, { transform: 'translate(0,0)' });
    }),
  ];
}

/** 섹션 번호(01. / 02.) 롤링 */
function numTrigger(opts: { start: string; introY: string; goalY: string; goalDelay?: number }) {
  gsap.set('.sc-intro .num-list', { y: 0 });
  gsap.set('.sc-goal .num-list', { y: 0 });

  gsap.to('.sc-intro .num-list', {
    scrollTrigger: { trigger: '.sc-intro .num-list', start: opts.start, end: 'bottom top' },
    duration: 1,
    y: opts.introY,
  });
  gsap.to('.sc-goal .num-list', {
    scrollTrigger: { trigger: '.sc-goal .num-list', start: opts.start, end: 'bottom top' },
    duration: 1,
    y: opts.goalY,
    delay: opts.goalDelay,
  });
}

const runCleanups = (cleanups: Cleanup[]) => () => cleanups.forEach((fn) => fn());

export function usePortfolioAnimation() {
  useGSAP(() => {
    /**
     * React 는 window load 이후에 마운트될 수 있어 ScrollTrigger 의 자동 refresh 가 누락됨
     * → 이미지/폰트 로드가 끝나면 트리거 위치를 다시 계산
     */
    let disposed = false;
    const imagesLoaded = $$<HTMLImageElement>('img')
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          }),
      );
    Promise.all([...imagesLoaded, document.fonts.ready]).then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    const mm = gsap.matchMedia();

    // large
    mm.add('(min-width: 1024px)', () => {
      const cursor = $('.cursor');
      const cleanups: Cleanup[] = [];

      /**
       *  header hide
       */
      cleanups.push(headerToggle(() => offsetTop($('.sc-contact')) - 200));

      /**
       * mouse event
       */
      cleanups.push(
        on(window, 'mousemove', (e) => {
          gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.2 });
        }),
      );

      const cursorHover = (selector: string, cursorClass: string) => {
        cleanups.push(
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
          ),
        );
      };
      cursorHover('[data-hover]', 'cursor-over');
      cursorHover('[data-img]', 'img-over');

      /**
       *  img hover event
       */
      const profile = gsap.to('.intro-bg', { width: '25vw', paused: true });
      const profileHover = $('#profileHover');
      if (profileHover) {
        cleanups.push(hover(profileHover, () => profile.play(), () => profile.reverse()));
      }

      /**
       * number trigger
       */
      numTrigger({ start: 'top 50%', introY: '-280px', goalY: '-560px' });

      /**
       * round cursor event
       */
      cleanups.push(...magnetic('.sc-contact .sub-tit', '.sc-contact .link-mail'));
      cleanups.push(...magnetic('.sc-intro .sub-tit', '.sc-intro .round'));

      return runCleanups(cleanups);
    });

    // medium
    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      const cleanups: Cleanup[] = [];

      /**
       *  header hide
       */
      cleanups.push(headerToggle(() => offsetTop($('.sc-goal')) + 200));

      /**
       *  img hover event 비활성화
       */
      const profileHover = $('#profileHover');
      if (profileHover) {
        profileHover.style.cursor = 'default';
        cleanups.push(() => {
          profileHover.style.cursor = '';
        });
      }

      /**
       * number trigger
       */
      numTrigger({ start: 'top 50%', introY: '-200px', goalY: '-400px' });

      return runCleanups(cleanups);
    });

    // small
    mm.add('(max-width: 767px)', () => {
      /**
       *  header hide
       */
      const offHeader = headerToggle(() => offsetTop($('.sc-goal')) + 500);

      /**
       * number trigger
       */
      numTrigger({ start: 'top 80%', introY: '-200px', goalY: '-400px', goalDelay: 0.6 });

      return offHeader;
    });

    // all
    mm.add('all', () => {
      /**
       * text-motion
       * 재실행 시(StrictMode 등) revert 후에도 남는 GSAP transform 캐시(zOrigin)를 먼저 비움
       */
      gsap.set('.txt-motion', { clearProps: 'transform' });
      gsap.set('.txt-motion', {
        yPercent: 110,
        transformStyle: 'preserve-3d',
        opacity: 0,
        rotationX: -45,
        transformOrigin: '0% 50% -100%',
      });

      const txtMotionIn = {
        transformStyle: 'preserve-3d',
        opacity: 1,
        rotationX: 0,
        transformOrigin: '50% 50%',
        yPercent: 0,
        stagger: 0.1,
      };

      const introAni = gsap.to('.sc-visual .txt-motion', { ...txtMotionIn, duration: 1.2, paused: true });

      gsap.to('.sc-intro .txt-motion', {
        ...txtMotionIn,
        scrollTrigger: { trigger: '.sc-visual', start: '40% top' },
        duration: 1.5,
      });

      gsap.to('.sc-contact .txt-motion', {
        ...txtMotionIn,
        scrollTrigger: { trigger: '.sc-contact', start: 'top 50%' },
        duration: 1.5,
      });

      /**
       *  loading ani
       */
      gsap
        .timeline({ onComplete: () => void introAni.play() })
        .addLabel('a')
        .to('.loading .list1', { y: '-280vw', duration: 4 }, 'a')
        .to('.loading .list2', { y: '-140vw', duration: 5 }, 'a')
        .to('.loading .list3', { y: '-340vw', duration: 3 }, 'a')
        .to('.loading', { yPercent: -100, display: 'none' }, 'a+=5');

      /**
       * Trigger event
       */
      gsap
        .timeline({
          scrollTrigger: { trigger: '.sc-visual .sc-title', start: 'top 30%', end: 'bottom top', scrub: 1 },
        })
        .addLabel('a')
        .to('.sc-visual .txt-line1', { xPercent: 100 }, 'a')
        .to('.sc-visual .txt-line2', { xPercent: -100 }, 'a');

      $$('[data-fade]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 120%', end: 'bottom top', scrub: 1 },
          yPercent: 15,
          opacity: 0,
          duration: 0.3,
        });
      });

      /**
       * img trigger
       */
      gsap.from('.sc-intro .point-area video', {
        scrollTrigger: { trigger: '.point-area', start: 'top bottom', end: 'bottom top', scrub: 1 },
        scale: 1.4,
      });

      /**
       * background color change
       */
      $$('[data-color]').forEach((el) => {
        const color = el.dataset.color === '#fff' ? 'white' : 'black';
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom top',
          toggleClass: { targets: '.background', className: color },
        });
      });
    });

    return () => {
      disposed = true;
      mm.revert();
    };
  });
}

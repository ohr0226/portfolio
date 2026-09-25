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

/**
 * 배경색 전환 기준 요소
 * 섹션 안에 [data-color-start] 가 있으면 그 지점부터 색을 바꿈 (예: intro 는 상단 흰 텍스트 영역을 지난 뒤)
 */
const colorStart = (el: HTMLElement) => el.querySelector<HTMLElement>('[data-color-start]') ?? el;

/**
 * 기준선(start, 뷰포트 상단 기준 비율)을 지난 마지막 섹션의 색으로 배경 클래스를 교체 (CSS transition 1s)
 * 스크롤할 때마다 현재 위치로 직접 계산 → 새로고침/빠른 스크롤에도 항상 한 가지 색만 적용
 */
function bgToggle(line: number) {
  const background = $('.background');
  const sections = $$('[data-color]');
  const update = () => {
    const y = window.innerHeight * line;
    const current = sections.filter((el) => colorStart(el).getBoundingClientRect().top <= y).pop() ?? sections[0];
    const isWhite = current?.dataset.color === '#fff';
    background?.classList.toggle('white', isWhite);
    background?.classList.toggle('black', !isWhite);
  };
  update();
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update });
}

/** 배경색을 스크롤 진행도에 맞춰 서서히 전환 (모바일: 빠른 스크롤에도 급하게 바뀌지 않도록) */
function bgScrub(opts: { start: string; end: string }) {
  gsap.set('.background', { transition: 'none' });
  const sections = $$('[data-color]');
  sections.forEach((el, i) => {
    if (i === 0) return;
    gsap.fromTo(
      '.background',
      { backgroundColor: sections[i - 1].dataset.color },
      {
        backgroundColor: el.dataset.color,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: colorStart(el), start: opts.start, end: opts.end, scrub: 1 },
      },
    );
  });
}

/** 로딩 글자 목록을 마지막 글자가 보이는 위치까지 올리는 y 값 */
const lastItemY = (_: number, list: HTMLElement) => -((list.lastElementChild as HTMLElement | null)?.offsetTop ?? 0);

const runCleanups = (cleanups: Cleanup[]) => () => cleanups.forEach((fn) => fn());

/** 사용하는 웹폰트를 명시적으로 로드 (화면에 아직 없는 폰트도 미리 받아둠), 느린 네트워크 대비 최대 3초 대기 */
const FONTS = ['400 1em Zephyr', '500 1em Pretendard', '300 1em Pretendard', '500 1em Fahkwang', '300 1em Gilroy'];
const loadFonts = () =>
  Promise.race([
    Promise.all(FONTS.map((font) => document.fonts.load(font).catch(() => []))),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]).then(() => undefined);

export function usePortfolioAnimation() {
  useGSAP(() => {
    /**
     * React 는 window load 이후에 마운트될 수 있어 ScrollTrigger 의 자동 refresh 가 누락됨
     * → 이미지/폰트 로드가 끝나면 트리거 위치를 다시 계산
     */
    let disposed = false;
    const fontsLoaded = loadFonts();
    const imagesLoaded = $$<HTMLImageElement>('img')
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          }),
      );
    Promise.all([...imagesLoaded, fontsLoaded]).then(() => {
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
       * background color change
       */
      bgToggle(0.6);

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

      /**
       * background color change
       */
      bgToggle(0.6);

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

      /**
       * background color change
       */
      bgScrub({ start: 'top 90%', end: 'top 10%' });

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
      const loadingAni = gsap
        .timeline({ paused: true, onComplete: () => void introAni.play() })
        .addLabel('a')
        // 마지막 글자(O/H/R)의 실제 위치만큼 이동 → 브라우저(Safari)별 줄 높이 반올림 차이에도 정렬 유지
        .to('.loading .list1', { y: lastItemY, duration: 4 }, 'a')
        .to('.loading .list2', { y: lastItemY, duration: 5 }, 'a')
        .to('.loading .list3', { y: lastItemY, duration: 3 }, 'a')
        .to('.loading', { yPercent: -100, display: 'none' }, 'a+=5');

      // 폰트가 모두 준비된 뒤 로딩 애니메이션 시작 (그 전엔 대체 폰트가 보이지 않도록 숨김)
      gsap.set('.loading .num-wrap', { autoAlpha: 0 });
      fontsLoaded.then(() => {
        gsap.set('.loading .num-wrap', { autoAlpha: 1 });
        loadingAni.play();
      });

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
          scrollTrigger: {
            trigger: el,
            start: 'top 120%',
            // 화면을 다 지나갈 때까지 흐리면 너무 늦어서, 화면 60% 지점에 오면 선명해지도록
            end: 'top 60%',
            scrub: 1,
          },
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
    });

    return () => {
      disposed = true;
      mm.revert();
    };
  });
}

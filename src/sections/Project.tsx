import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProjectCard from '../components/ProjectCard';
import ProjectTabs, { PANEL_ID, tabId } from '../components/ProjectTabs';
import { projects, type ProjectCategory } from '../data/projects';

const counts = projects.reduce(
  (acc, p) => ({ ...acc, [p.category]: acc[p.category] + 1 }),
  { work: 0, personal: 0 } as Record<ProjectCategory, number>,
);

export default function Project() {
  const [tab, setTab] = useState<ProjectCategory>('work');
  const areaRef = useRef<HTMLDivElement>(null);
  const prevTab = useRef(tab);
  const list = projects.filter((p) => p.category === tab);

  // 탭이 바뀔 때마다 카드 높이 / dim 애니메이션을 새 카드 기준으로 다시 적용
  useGSAP(
    () => {
      const area = areaRef.current!;
      const wraps = gsap.utils.toArray<HTMLElement>('.project-wrap', area);

      /**
       * project-wrap 높이를 뷰포트 높이에 맞춤
       */
      const onResize = () => {
        wraps.forEach((el) => {
          el.style.height = `${window.innerHeight}px`;
        });
      };
      onResize();
      window.addEventListener('resize', onResize);

      /**
       *  project-area dim
       */
      wraps.forEach((el) => {
        const shadow = el.querySelector('.bg-shadow');
        if (!shadow) return;
        gsap.to(shadow, {
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
          opacity: 1,
        });
      });

      // 탭 전환 시: 카드 수만큼 페이지 높이가 바뀌므로 전체 트리거 위치 재계산 후 첫 카드로 이동
      if (prevTab.current !== tab) {
        prevTab.current = tab;
        ScrollTrigger.refresh();
        window.scrollTo({ top: area.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
      }

      return () => window.removeEventListener('resize', onResize);
    },
    { dependencies: [tab], scope: areaRef, revertOnUpdate: true },
  );

  return (
    <section className="sc-project" data-color="#000">
      <div className="title-area">
        <h2 className="sc-title">MY PROJECT</h2>
      </div>
      <div className="project-area" ref={areaRef}>
        <ProjectTabs active={tab} counts={counts} onChange={setTab} />
        <div className="project-list" id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(tab)}>
          {list.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} total={list.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

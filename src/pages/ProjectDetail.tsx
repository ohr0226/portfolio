import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import parse from 'html-react-parser';
import { useGSAP } from '@gsap/react';
import { projects, projectTabs } from '../data/projects';
import { projectDetails } from '../data/projectDetails';
import { lastViewed, projectPath } from '../hooks/useHashRoute';

// 메인 탭 순서(RENEWAL → MAINTENANCE → ...)대로 상세가 있는 프로젝트만 나열 → 이전 / 다음 이동에 사용
const detailOrder = projectTabs.flatMap((tab) =>
  projects.filter((p) => p.category === tab.id && projectDetails[p.id]),
);

interface Props {
  id: string;
}

export default function ProjectDetail({ id }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const index = detailOrder.findIndex((p) => p.id === id);
  const project = detailOrder[index];
  const detail = projectDetails[id];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // 메인으로 돌아갔을 때 이 프로젝트 카드 위치로 복귀
    lastViewed.id = project ? id : null;
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.title} | 오혜림 포트폴리오`;
    return () => {
      document.title = prevTitle;
    };
  }, [id, project]);

  useGSAP(
    () => {
      if (!project) return;
      gsap.from('.detail-hero [data-reveal]', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('[data-detail-fade]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    },
    { scope: pageRef, dependencies: [id] },
  );

  if (!project || !detail) {
    return (
      <main className="detail-page detail-empty">
        <p>프로젝트를 찾을 수 없어요.</p>
        <a href="#" className="detail-btn" data-hover>
          Back to Main
        </a>
      </main>
    );
  }

  const prev = detailOrder[(index - 1 + detailOrder.length) % detailOrder.length];
  const next = detailOrder[(index + 1) % detailOrder.length];
  const siteLinks = project.links.filter((link) => link.type === 'page');
  const theme = { '--detail-bg': detail.theme.bg, '--detail-color': detail.theme.color } as CSSProperties;

  return (
    <main className="detail-page" ref={pageRef}>
      <section className="detail-hero" style={theme}>
        <div className="hero-text">
          <div className="hero-logo" data-reveal>
            <img src={project.thumb.src} alt={project.thumb.alt} />
          </div>
          <p className="hero-label" data-reveal>
            {detail.type}
          </p>
          <h2 className="hero-tit" data-reveal>
            {project.title}
          </h2>
          <p className="hero-summary" data-reveal>
            {parse(detail.summary)}
          </p>
        </div>
      </section>

      <section className="detail-meta" data-detail-fade>
        <h3 className="blind">프로젝트 정보</h3>
        <dl>
          <div className="meta-item">
            <dt>Period</dt>
            <dd>{detail.period}</dd>
          </div>
          <div className="meta-item">
            <dt>Role</dt>
            <dd>{detail.role}</dd>
          </div>
          <div className="meta-item">
            <dt>Type</dt>
            <dd>{detail.type}</dd>
          </div>
          {project.skills && (
            <div className="meta-item meta-stack">
              <dt>Stack</dt>
              <dd>
                {project.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
        {siteLinks.length > 0 && (
          <div className="detail-links">
            {siteLinks.map((link) => (
              <a key={link.href} href={link.href} className="detail-btn" target="_blank" rel="noopener noreferrer" data-hover>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="detail-body">
        <h3 className="blind">작업 내용</h3>
        {detail.sections.map((section, i) => (
          <div className="work-row" key={section.title} data-detail-fade>
            <div className="work-head">
              <span className="work-num">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="work-tit">{section.title}</h4>
            </div>
            <ul className="work-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <nav className="detail-nav" aria-label="다른 프로젝트">
        <a href={projectPath(prev.id)} className="nav-prev" data-hover>
          <span className="nav-label">Prev</span>
          <span className="nav-tit">{prev.title}</span>
        </a>
        <a href="#" className="nav-list" data-hover>
          All Projects
        </a>
        <a href={projectPath(next.id)} className="nav-next" data-hover>
          <span className="nav-label">Next</span>
          <span className="nav-tit">{next.title}</span>
        </a>
      </nav>
    </main>
  );
}

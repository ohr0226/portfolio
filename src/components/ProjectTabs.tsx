import { useRef, type KeyboardEvent } from 'react';
import { projectTabs, type ProjectCategory } from '../data/projects';

interface Props {
  active: ProjectCategory;
  counts: Record<ProjectCategory, number>;
  onChange: (tab: ProjectCategory) => void;
}

export const tabId = (tab: ProjectCategory) => `project-tab-${tab}`;
export const PANEL_ID = 'project-panel';

export default function ProjectTabs({ active, counts, onChange }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 좌우 방향키 / Home / End 로 탭 이동 (WAI-ARIA tabs 패턴)
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = projectTabs.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(projectTabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="project-tab">
      <div className="tab-list" role="tablist" aria-label="프로젝트 분류">
        {projectTabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId(tab.id)}
              type="button"
              role="tab"
              className="tab-btn"
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              data-hover
            >
              {tab.label}
              <span className="count">{counts[tab.id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

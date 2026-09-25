import { Fragment } from 'react';
import parse from 'html-react-parser';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: Props) {
  const { id, title, desc, thumb, links, skills, shadow } = project;
  const descLines = Array.isArray(desc) ? desc : [desc];

  return (
    <div className={`project-wrap wrap-${id}`}>
      {shadow && <div className="bg-shadow"></div>}
      <div className="column-left">
        <a href={thumb.href} className="thumb-box" target="_blank" rel="noopener noreferrer" data-img>
          <img src={thumb.src} alt={thumb.alt} />
        </a>
      </div>
      <div className="column-right">
        <div className="info-box">
          <div className="pagination">
            <em className="current"><span className="blind">현재페이지</span>{index}</em>
            {' / '}
            <span className="total"><span className="blind">전체페이지</span>{total}</span>
          </div>
          <h3 className="project-tit">{title}</h3>
          <p className="desc">
            {descLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {parse(line)}
              </Fragment>
            ))}
          </p>
          <div className="links">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={`link-${link.type}`} target="_blank" rel="noopener noreferrer" data-hover>
                {link.label}
              </a>
            ))}
          </div>
          {skills && (
            <div className="skill">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

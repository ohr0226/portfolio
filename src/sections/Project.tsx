import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Project() {
  return (
    <section className="sc-project" data-color="#000">
      <div className="title-area">
        <h2 className="sc-title">MY PROJECT</h2>
      </div>
      <div className="project-area">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i + 1} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

import NumCounter from '../components/NumCounter';
import goalImage from '../assets/images/ohr-bg.jpg';

export default function Goal() {
  return (
    <section className="sc-goal" data-color="#fff">
      <h2 className="blind">My Goal</h2>
      <NumCounter />
      <div className="goal-area">
        <div className="column-left" data-fade>
          <div className="desc-box">
            <strong className="desc-tit">The Goal</strong>
            <p className="desc-txt">
              프론트엔드 개발자로서, 창의적이고 혁신적인 사용자 경험을 위해 웹 성능 최적화와 접근성을 개선하고자 합니다. UI/UX에 대한 열정과 디자이너로서의 경험을 바탕으로, 협업을 통해 독창적인 디자인과 최신 기술을 결합하여 새로운 웹 플랫폼을 구축하고자 합니다.
            </p>
          </div>
        </div>
        <div className="column-right">
          <figure className="thumb-box">
            <img src={goalImage} alt="내 목표" />
          </figure>
        </div>
      </div>
    </section>
  );
}

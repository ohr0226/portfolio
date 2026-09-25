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
              사용자가 진짜 원하는 것이 무엇인지 먼저 고민하고, 그 답을 성능과 접근성을 갖춘 웹 경험으로 구현하는 프론트엔드 개발자를 지향합니다. 콘텐츠 페이지 PL로 일정을 이끌며, 디자이너·기획자·개발자 간의 원활한 협업이 곧 더 나은 사용자 경험으로 이어진다는 것을 배웠습니다. 디자이너로서의 경험과 UI/UX에 대한 열정을 바탕으로, 팀과 함께 사용자 중심의 웹을 만들어 가겠습니다.
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

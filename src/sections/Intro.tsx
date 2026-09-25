import NumCounter from '../components/NumCounter';
import introGif from '../assets/images/ohr-gif.gif';

export default function Intro() {
  return (
    <section className="sc-intro" data-color="#fff">
      <h2 className="blind">INTRODUCE</h2>
      <div className="intro-area">
        <div className="sub-tit">
          <h3 className="round" data-hover>INTRO</h3>
        </div>
        <div className="intro-box">
          <p className="intro-msg">
            <span className="txt-line1">
              <em className="txt1 txt-motion">HELLO!</em>&nbsp;
              <em id="profileHover" className="txt2 txt-motion" data-hover>I'M OH HYERIM</em>
              <span className="intro-bg"><span className="profile"></span><span className="blind">My profile</span></span>
            </span>
            <span className="txt-line2">
              <span className="txt txt-motion">I WANT TO BE</span>&nbsp;<span className="txt txt-motion">A CREATIVE</span>
            </span>
            <span className="txt-line3">
              <span className="txt txt-motion">FRONTEND</span> <span className="txt txt-motion">DEVELOPER</span>
            </span>
          </p>
        </div>
      </div>
      <div className="point-area">
        <div className="column-left">
          <figure className="thumb-box">
            <img src={introGif} alt="오혜림 소개" />
          </figure>
        </div>
        <div className="column-right" data-fade>
          <div className="desc-box">
            <strong className="desc-tit">There's more than meets the eye.</strong>
            <p className="desc-txt">
              시각적으로 아름답고 화려한 디자인만을 만드는 것이 전부가 아닌,
              최적의 사용자 경험을 제공하는 것을 목표로 하는
              개발자가 되겠습니다.
            </p>
          </div>
        </div>
      </div>
      <NumCounter />
      <div className="caption-area" data-fade>
        <div className="caption-box">
          <h3 className="sub-tit">MANIFESTO</h3>
          <p className="desc">GooD Design Means Good Business.</p>
        </div>
      </div>
    </section>
  );
}

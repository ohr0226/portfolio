import NumCounter from '../components/NumCounter';
import introMp4 from '../assets/images/ohr-intro.mp4';
import introWebm from '../assets/images/ohr-intro.webm';
import introPoster from '../assets/images/ohr-intro-poster.jpg';

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
            <video
              width={1080}
              height={1588}
              poster={introPoster}
              autoPlay
              muted
              loop
              playsInline
              aria-label="오혜림 소개"
            >
              <source src={introWebm} type="video/webm" />
              <source src={introMp4} type="video/mp4" />
            </video>
          </figure>
        </div>
        <div className="column-right" data-fade>
          <div className="desc-box">
            <strong className="desc-tit">There's more than meets the eye.</strong>
            <p className="desc-txt">
              보기 좋은 화면 너머, 사용자가 편하게 쓰는 경험까지 설계합니다.
              디자이너의 시선으로 디자인 의도를 정확히 구현하고,
              성능과 접근성까지 챙기는 프론트엔드 개발을 해왔습니다.
            </p>
            <dl className="career">
              <dt className="career-tit">NOW</dt>
              <dd className="career-txt">
                디자인피버 재직 중<span className="period">2022.11 ~ 현재</span>
              </dd>
            </dl>
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

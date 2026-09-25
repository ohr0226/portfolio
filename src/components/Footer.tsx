import callIcon from '../assets/images/call.svg';
import mailIcon from '../assets/images/mail.svg';
import githubIcon from '../assets/images/github.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="link-area">
        <a href="tel:010-9181-0226" data-hover>
          <span className="pc">PHONE</span>
          <i className="mobile"><img src={callIcon} alt="전화번호:010-9181-0226" /></i>
        </a>
        <a href="mailto:tmvkfmxk00@naver.com" data-hover>
          <span className="pc">EMAIL</span>
          <i className="mobile"><img src={mailIcon} alt="이메일주소:tmvkfmxk00@naver.com" /></i>
        </a>
        <a href="https://github.com/ohr0226" target="_blank" data-hover>
          <span className="pc">GITHUB</span>
          <i className="mobile"><img src={githubIcon} alt="깃허브주소:https://github.com/ohr0226" /></i>
        </a>
      </div>
      <div className="copy-area">
        <small>© 2024. All rights reserved.</small>
      </div>
    </footer>
  );
}

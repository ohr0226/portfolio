import callIcon from '../assets/images/call.svg';
import mailIcon from '../assets/images/mail.svg';
import githubIcon from '../assets/images/github.png';
import resumeIcon from '../assets/images/resume.svg';
import downloadIcon from '../assets/images/download.svg';

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
        <a href="https://github.com/ohr0226" target="_blank" rel="noopener noreferrer" data-hover>
          <span className="pc">GITHUB</span>
          <i className="mobile"><img src={githubIcon} alt="깃허브주소:https://github.com/ohr0226" /></i>
        </a>
        {/* public/career.pdf — 경력기술서 (새 탭에서 열기) */}
        <a href={`${import.meta.env.BASE_URL}career.pdf`} target="_blank" rel="noopener noreferrer" data-hover>
          <span className="pc">CAREER ↗</span>
          <i className="mobile"><img src={resumeIcon} alt="경력기술서 PDF" /></i>
        </a>
        {/* public/resume.pdf — 이력서·자기소개서 (다운로드) */}
        <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="link-career" download="오혜림_이력서.pdf" data-hover>
          <span className="pc">RESUME ↓</span>
          <i className="mobile"><img src={downloadIcon} alt="이력서 PDF 다운로드" /></i>
        </a>
      </div>
      <div className="copy-area">
        <small>© {new Date().getFullYear()}. All rights reserved.</small>
      </div>
    </footer>
  );
}

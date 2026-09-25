/** 스크롤 시 01. / 02. 로 굴러가는 섹션 번호 */
export default function NumCounter() {
  return (
    <div className="num-area">
      <div className="num-box">
        <span className="num-txt">0</span>
        <ul className="num-list">
          <li className="num-item">0</li>
          <li className="num-item">1</li>
          <li className="num-item">2</li>
        </ul>
        <span className="num-txt">.</span>
      </div>
    </div>
  );
}

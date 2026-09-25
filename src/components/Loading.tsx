const alphabet = 'ABCDEFGHIJKLNMOPQR'.split('');
const columns = [
  { className: 'list1', letters: alphabet.slice(0, 15) },
  { className: 'list2', letters: alphabet.slice(0, 8) },
  { className: 'list3', letters: alphabet },
];

export default function Loading() {
  return (
    <div className="loading">
      <div className="num-wrap">
        {columns.map(({ className, letters }) => (
          <div className="num-box" key={className}>
            <ul className={`num-list ${className}`}>
              {letters.map((letter) => (
                <li className="num-item" key={letter}>{letter}</li>
              ))}
            </ul>
          </div>
        ))}
        <span className="num-txt">.</span>
      </div>
    </div>
  );
}

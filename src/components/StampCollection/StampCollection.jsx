import { useEffect, useState } from 'react';
import Stamp from '../Stamp/Stamp';

export default function StampCollection({ stamps, selectedStampId, onSelect, onDelete }) {
  const [checkedIds, setCheckedIds] = useState([]);
  const allChecked = stamps.length > 0 && checkedIds.length === stamps.length;

  useEffect(() => {
    const currentIds = new Set(stamps.map(stamp => stamp.id));
    setCheckedIds(previous => previous.filter(id => currentIds.has(id)));
  }, [stamps]);

  function toggleChecked(id) {
    setCheckedIds(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  }

  function deleteChecked() {
    if (!checkedIds.length) return;
    onDelete(checkedIds);
    setCheckedIds([]);
  }

  return <section className="collection-section">
    <div className="section-head"><div><h3>Collection</h3><p>클릭하면 엽서에 붙고, 체크하면 삭제 목록에 담겨요.</p></div><span className="small-label">{String(stamps.length).padStart(2, '0')}</span></div>

    {stamps.length > 0 && <div className="collection-tools">
      <button onClick={() => setCheckedIds(allChecked ? [] : stamps.map(stamp => stamp.id))}>{allChecked ? '선택 해제' : '전체 선택'}</button>
      <button onClick={() => setCheckedIds([])} disabled={!checkedIds.length}>선택 취소</button>
      <button className="delete-stamps-btn" onClick={deleteChecked} disabled={!checkedIds.length}>선택 삭제 {checkedIds.length ? `· ${checkedIds.length}` : ''}</button>
    </div>}

    {stamps.length ? <div className="collection">
      {stamps.map((stamp, index) => {
        const checked = checkedIds.includes(stamp.id);
        return <div key={stamp.id} className={`collection-card ${selectedStampId === stamp.id ? 'active' : ''} ${checked ? 'checked' : ''}`}>
          <button className="collection-stamp-select" aria-label={`${index + 1}번 ${stamp.label} 우표 선택`} aria-pressed={selectedStampId === stamp.id} onClick={() => onSelect(stamp.id)}>
            <Stamp stamp={stamp} /><span>{stamp.label} · {String(index + 1).padStart(2, '0')}</span>
          </button>
          <label className="collection-check">
            <input type="checkbox" checked={checked} onChange={() => toggleChecked(stamp.id)} aria-label={`${index + 1}번 ${stamp.label} 우표 삭제 목록에 추가`} />
            <span aria-hidden="true">{checked ? '✓' : ''}</span>
          </label>
        </div>;
      })}
    </div> : <div className="empty-collection"><span>아직 비어 있는 여행 기록</span><p>풍경을 클릭해 마음에 드는 장면을 모아보세요.</p></div>}
  </section>;
}

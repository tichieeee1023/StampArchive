import { useEffect, useRef } from 'react';
import StampCollection from '../StampCollection/StampCollection';
import PostcardDesk from '../PostcardDesk/PostcardDesk';

export default function ArchiveDesk({ onClose, stamps, selectedStampId, onSelectStamp, onDeleteStamps, ...postcardProps }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current.showModal();
    return () => { previous?.focus(); };
  }, []);
  return <dialog ref={dialogRef} className="archive-desk" aria-labelledby="archive-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}>
    <button className="close-btn archive-close" aria-label="아카이브 닫기" onClick={onClose}>×</button>
    <div className="archive-layout">
      <div className="archive-library">
        <header className="archive-header"><p className="small-label">A LITTLE ARCHIVE OF TRAVELS</p><h2 id="archive-title">Stamp Archive</h2><p className="archive-count">{stamps.length} COLLECTED</p></header>
        <StampCollection stamps={stamps} selectedStampId={selectedStampId} onSelect={onSelectStamp} onDelete={onDeleteStamps} />
      </div>
      <PostcardDesk {...postcardProps} stamp={stamps.find(stamp => stamp.id === selectedStampId)} />
    </div>
  </dialog>;
}

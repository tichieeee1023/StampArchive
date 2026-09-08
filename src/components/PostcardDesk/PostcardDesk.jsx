import { useRef, useState } from 'react';
import Stamp from '../Stamp/Stamp';
import PostmarkPicker, { Postmark } from '../PostmarkPicker/PostmarkPicker';
import { downloadPostcard } from '../../utils/downloadPostcard';

export default function PostcardDesk({
  postcard, stamp, selectedPostmark, onSelectPostmark, onNewCard,
  onRandomImage, onRandomMessage, onStamp,
}) {
  const postcardRef = useRef(null);
  const [downloadStatus, setDownloadStatus] = useState('');

  async function handleDownload() {
    setDownloadStatus('이미지를 만드는 중…');
    try {
      const filename = await downloadPostcard(postcardRef.current);
      setDownloadStatus(`${filename} 저장 완료`);
    } catch (error) {
      console.error(error);
      setDownloadStatus('다운로드에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  }

  return <section className="postcard-section">
    <div className="section-head">
      <div><h3>Postcard Desk</h3><p>한 장면을 붙이고, 오늘의 소인을 남겨요.</p></div>
    </div>

    <div className="postcard-customizer" aria-label="엽서 꾸미기">
      <button className="customizer-btn shuffle-btn" onClick={onRandomImage}>IMAGE SHUFFLE</button>
      <button className="customizer-btn shuffle-btn" onClick={onRandomMessage}>MESSAGE SHUFFLE</button>
      <button className="customizer-btn" onClick={onNewCard}>NEW CARD ↗</button>
      <button className="customizer-btn download-btn" onClick={handleDownload}>DOWNLOAD ↓</button>
    </div>

    <div className="postcard-workspace">
      <article ref={postcardRef} className="postcard-card" aria-label="나의 엽서">
        <div className="postcard-cover" style={{ backgroundImage: `url("${postcard.preset.image}")` }} />
        <div className="postcard-paper">
          <div className="postcard-meta"><span>{postcard.preset.title}</span><span>{postcard.preset.location}</span></div>
          <p className={`postcard-message ${postcard.message ? '' : 'empty'}`}>{postcard.message || '당신만의 이야기를 적어보세요.'}</p>
          <div className="postcard-signature">From a little archive of travels</div>
        </div>
        <div className="pasted-stamp">{stamp ? <Stamp stamp={stamp} /> : <div className="empty-stamp-note">CHOOSE<br />A STAMP</div>}</div>
        {postcard.postmark && <div key={postcard.postmark.key} className="applied-postmark" style={{ '--turn': `${postcard.postmark.rotation}deg`, '--shift': `${postcard.postmark.shift}px` }}><Postmark mark={postcard.postmark} /></div>}
      </article>

      <aside className="postmark-rail" aria-label="소인 작업 도구">
        <PostmarkPicker selected={selectedPostmark} onSelect={onSelectPostmark} />
        <button className="stamp-floating-btn" disabled={!stamp} onClick={onStamp}>STAMP IT</button>
        <p className="desk-status" role="status">
          {downloadStatus || (!stamp ? '먼저 Collection에서 우표를 선택해주세요.' : postcard.postmark ? `${postcard.postmark.main} 소인을 찍었어요.` : '소인을 선택하고 STAMP IT을 눌러주세요.')}
        </p>
      </aside>
    </div>
  </section>;
}

import { useRef, useState } from 'react';

export default function TravelStage({ preset, onCollect }) {
  const imageRef = useRef(null);
  const cursorRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  function collect(event) {
    const image = imageRef.current;
    if (status !== 'ready' || !image?.naturalWidth) return;
    const rect = event.currentTarget.getBoundingClientRect();
    onCollect({
      x: event.clientX - rect.left, y: event.clientY - rect.top,
      stageWidth: rect.width, stageHeight: rect.height,
      imageWidth: image.naturalWidth, imageHeight: image.naturalHeight,
    });
  }

  return <>
    <button className="travel-stage" aria-label={`${preset.label} 풍경에서 우표 수집`}
      onPointerEnter={() => cursorRef.current?.classList.add('visible')}
      onPointerLeave={() => cursorRef.current?.classList.remove('visible')}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        cursorRef.current?.style.setProperty('transform', `translate(${event.clientX - rect.left}px, ${event.clientY - rect.top}px) translate(-50%, -50%)`);
      }}
      onClick={event => {
      if (event.detail === 0) {
        const rect = event.currentTarget.getBoundingClientRect();
        collect({ currentTarget: event.currentTarget, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
      } else collect(event);
    }}>
      <img key={attempt} ref={imageRef} src={preset.image} alt="" onLoad={() => setStatus('ready')} onError={() => setStatus('error')} />
      <span ref={cursorRef} className="stamp-cursor" aria-hidden="true"><span>COLLECT</span></span>
    </button>
    {status !== 'ready' && <div className="image-status" role="status">
      {status === 'loading' ? '여행 풍경을 불러오는 중…' : <>사진을 불러오지 못했어요. <button onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>다시 시도</button></>}
    </div>}
  </>;
}


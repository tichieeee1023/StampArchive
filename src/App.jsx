import { useState } from 'react';
import { travelPresets } from './data/travelPresets';
import { postcardPresets } from './data/postcardPresets';
import { messages } from './data/messages';
import { postmarks } from './data/postmarks';
import { pickRandom, random } from './utils/random';
import TravelStage from './components/TravelStage/TravelStage';
import PresetNav from './components/PresetNav/PresetNav';
import ArchiveDesk from './components/ArchiveDesk/ArchiveDesk';
import Stamp from './components/Stamp/Stamp';

function createPostcard(previous) {
  return {
    preset: pickRandom(postcardPresets.filter(item => item.id !== previous?.preset.id)),
    message: pickRandom(messages.filter(message => message !== previous?.message)),
    postmark: null,
  };
}

function randomPreset(currentId) {
  return pickRandom(postcardPresets.filter(item => item.id !== currentId));
}

function randomMessage(currentMessage) {
  return pickRandom(messages.filter(message => message !== currentMessage));
}

export default function App() {
  const [currentPreset, setCurrentPreset] = useState('paris');
  const [stamps, setStamps] = useState([]);
  const [floorStampIds, setFloorStampIds] = useState([]);
  const [isSweeping, setIsSweeping] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [selectedStampId, setSelectedStampId] = useState(null);
  const [postcard, setPostcard] = useState(() => createPostcard());
  const [selectedPostmark, setSelectedPostmark] = useState(postmarks[0].id);
  const preset = travelPresets.find(item => item.id === currentPreset);

  function collect(coordinates) {
    if (isSweeping) return;
    const pileScale = random(0.72, 1.22);
    const pileBottom = random(-62, 75);
    const pileX = random(3, 97);
    const stamp = {
      ...coordinates, id: crypto.randomUUID(), presetId: preset.id, label: preset.label,
      variant: preset.variant, image: preset.image, rotation: random(-34, 34),
      startRotation: random(-80, 80), pileX, pileBottom, pileScale,
      pileLayer: Math.floor(random(1, 20)),
      sweepY: random(-280, 240), sweepTurn: random(240, 680), sweepDelay: random(0, 0.16),
    };
    setStamps(previous => [...previous, stamp]);
    setFloorStampIds(previous => [...previous, stamp.id]);
  }

  function sweepFloor() {
    if (!floorStampIds.length || isSweeping) return;
    const sweptIds = new Set(floorStampIds);
    setIsSweeping(true);
    window.setTimeout(() => {
      setFloorStampIds(previous => previous.filter(id => !sweptIds.has(id)));
      setIsSweeping(false);
    }, 1250);
  }

  function deleteStamps(ids) {
    const deletedIds = new Set(ids);
    setStamps(previous => previous.filter(stamp => !deletedIds.has(stamp.id)));
    setFloorStampIds(previous => previous.filter(id => !deletedIds.has(id)));
    if (selectedStampId && deletedIds.has(selectedStampId)) {
      setSelectedStampId(null);
      setPostcard(previous => ({ ...previous, postmark: null }));
    }
  }

  return <main className="app">
    <TravelStage key={preset.id} preset={preset} onCollect={collect} />
    <div className={`dropped-stamps ${isSweeping ? 'sweeping' : ''}`} aria-hidden="true">
      {stamps.filter(stamp => floorStampIds.includes(stamp.id)).map(stamp => <div key={stamp.id} className="dropped-stamp" style={{
        left: `${stamp.pileX}%`, bottom: `${stamp.pileBottom}px`, zIndex: stamp.pileLayer,
        '--start-x': `${stamp.x - stamp.stageWidth * stamp.pileX / 100}px`,
        '--start-y': `${stamp.y - (stamp.stageHeight - stamp.pileBottom - 80 * stamp.pileScale)}px`,
        '--rotation': `${stamp.rotation}deg`, '--start-rotation': `${stamp.startRotation}deg`,
        '--pile-scale': stamp.pileScale,
        '--sweep-y': `${stamp.sweepY}px`, '--sweep-turn': `${stamp.sweepTurn}deg`,
        '--sweep-delay': `${stamp.sweepDelay}s`,
      }}><Stamp stamp={stamp} /></div>)}
    </div>
    <header className="header"><div className="title-area"><p className="eyebrow">INTERACTIVE STAMP COLLECTION</p><h1 className="title">Yoojin<br />Postcards</h1></div><PresetNav currentPreset={currentPreset} onChange={setCurrentPreset} /></header>
    <p className="guide">CLICK ANYWHERE TO COLLECT A STAMP</p>
    {floorStampIds.length > 0 && <button className="sweep-trigger" disabled={isSweeping} onClick={sweepFloor}><span aria-hidden="true">⌁</span>{isSweeping ? '바람에 날리는 중…' : '쓱, 바닥 비우기'}</button>}
    <button className="archive-trigger" onClick={() => setArchiveOpen(true)}>ARCHIVE · {stamps.length}</button>
    {stamps.length >= 5 && <button className="archive-invitation" onClick={() => setArchiveOpen(true)}><span>{stamps.length} STAMPS COLLECTED</span>OPEN YOUR ARCHIVE →</button>}
    <span className="sr-only" role="status">{stamps.length}개의 우표를 수집했어요.</span>
    {archiveOpen && <ArchiveDesk onClose={() => setArchiveOpen(false)} stamps={stamps} selectedStampId={selectedStampId} onSelectStamp={id => { setSelectedStampId(id); setPostcard(previous => ({ ...previous, postmark: null })); }} onDeleteStamps={deleteStamps} postcard={postcard} selectedPostmark={selectedPostmark} onSelectPostmark={setSelectedPostmark}
      onNewCard={() => setPostcard(previous => createPostcard(previous))}
      onRandomImage={() => setPostcard(previous => ({ ...previous, preset: randomPreset(previous.preset.id) }))}
      onRandomMessage={() => setPostcard(previous => ({ ...previous, message: randomMessage(previous.message) }))}
      onStamp={() => {
      if (!selectedStampId) return;
      setPostcard(previous => ({ ...previous, postmark: { ...postmarks.find(mark => mark.id === selectedPostmark), key: crypto.randomUUID(), rotation: random(-18, 12), shift: random(-6, 6) } }));
    }} />}
  </main>;
}

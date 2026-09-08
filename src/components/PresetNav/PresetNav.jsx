import { travelPresets } from '../../data/travelPresets';

export default function PresetNav({ currentPreset, onChange }) {
  return <nav className="preset-nav" aria-label="여행지 선택">
    {travelPresets.map(preset => <button key={preset.id} className={`preset-btn ${preset.id === currentPreset ? 'active' : ''}`} aria-pressed={preset.id === currentPreset} onClick={() => onChange(preset.id)}>{preset.label}</button>)}
  </nav>;
}

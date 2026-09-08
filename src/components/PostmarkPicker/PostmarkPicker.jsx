import { postmarks } from '../../data/postmarks';

function getPostmarkDate(date = new Date()) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const day = String(date.getDate()).padStart(2, '0');
  const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${day}`;
  return { iso, label: `${day} ${months[date.getMonth()]} ${date.getFullYear()}` };
}

export function Postmark({ mark }) {
  const today = getPostmarkDate();
  return <span className={`postmark-ink postmark-ink--${mark.shape}`} role="img" aria-label={`${mark.main} ${mark.sub} postmark`} style={{ '--ink': mark.color }}>
    <img className="postmark-art postmark-art--sharp" src={mark.image} alt="" aria-hidden="true" />
    <img className="postmark-art postmark-art--bleed" src={mark.image} alt="" aria-hidden="true" />
    <time className="postmark-date" dateTime={today.iso}>{today.label}</time>
  </span>;
}

export default function PostmarkPicker({ selected, onSelect }) {
  return <fieldset className="postmark-picker"><legend>CHOOSE A POSTMARK</legend><div className="postmark-options">
    {postmarks.map(mark => <button key={mark.id} className={`postmark-option ${selected === mark.id ? 'active' : ''}`} aria-label={`${mark.main} 소인 선택`} aria-pressed={selected === mark.id} onClick={() => onSelect(mark.id)}><Postmark mark={mark} /></button>)}
  </div></fieldset>;
}

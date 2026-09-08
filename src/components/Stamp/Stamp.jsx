import { useId } from 'react';
import { getStampCrop } from '../../utils/getStampCrop';

const variants = {
  classic: { radius: 4, spacing: 12, inner: 11 },
  bold: { radius: 5.5, spacing: 15, inner: 10 },
  slim: { radius: 3, spacing: 10, inner: 9 },
  double: { radius: 4, spacing: 12, inner: 16 },
  soft: { radius: 5, spacing: 13, inner: 12 },
};

export default function Stamp({ stamp }) {
  const id = useId().replaceAll(':', '');
  const config = variants[stamp.variant] || variants.classic;
  const { radius, spacing, inner } = config;
  const holes = [];
  for (let x = spacing / 2; x < 120; x += spacing) {
    holes.push(<circle key={`t${x}`} cx={x} cy="0" r={radius} fill="black" />, <circle key={`b${x}`} cx={x} cy="160" r={radius} fill="black" />);
  }
  for (let y = spacing / 2; y < 160; y += spacing) {
    holes.push(<circle key={`l${y}`} cx="0" cy={y} r={radius} fill="black" />, <circle key={`r${y}`} cx="120" cy={y} r={radius} fill="black" />);
  }
  return <svg className="stamp-svg" viewBox="0 0 120 160" role="img" aria-label={`${stamp.label}에서 수집한 우표`}>
    <defs>
      <mask id={`mask-${id}`}><rect width="120" height="160" fill="white" />{holes}</mask>
      <clipPath id={`clip-${id}`}><rect x={inner} y={inner} width={120 - inner * 2} height={160 - inner * 2} rx={stamp.variant === 'soft' ? 8 : 0} /></clipPath>
    </defs>
    <rect width="120" height="160" fill="#f4ead2" mask={`url(#mask-${id})`} />
    <image href={stamp.image} {...getStampCrop(stamp, inner)} preserveAspectRatio="none" clipPath={`url(#clip-${id})`} />
    {stamp.variant === 'double' && <rect x="13" y="13" width="94" height="134" fill="none" stroke="#79674f" strokeWidth="1" />}
  </svg>;
}

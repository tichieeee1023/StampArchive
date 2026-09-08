import airmailImage from '../assets/1.png';
import archiveImage from '../assets/2.png';
import approvedImage from '../assets/3.png';
import deliveryImage from '../assets/4.png';

export const postmarks = [
  { id: 'airmail', main: 'AIR MAIL', sub: 'BON VOYAGE', color: '#7d3129', shape: 'round', image: airmailImage },
  { id: 'archive', main: 'POSTMARK', sub: 'TRAVEL ARCHIVE', color: '#28364b', shape: 'rectangle', image: archiveImage },
  { id: 'approved', main: 'APPROVED', sub: 'VIA AEROGRAMME', color: '#45433e', shape: 'triangle', image: approvedImage },
  { id: 'delivery', main: 'SPECIAL', sub: 'DELIVERY', color: '#7d3129', shape: 'cancelled', image: deliveryImage },
];

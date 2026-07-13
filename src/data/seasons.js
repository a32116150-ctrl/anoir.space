// Seasonal themes with astronomical date ranges

const SEASONS = [
  {
    id: 'spring',
    name: 'Spring',
    icon: '🌸',
    wallpaper: { id: 'season-spring', name: 'Spring', type: 'image', value: '/seasons/spring.svg', color: '#90ee90' },
    colors: { primary: '#2d5a27', accent: '#ffb7c5', text: '#ffffff' },
    effect: 'petals',
    banner: 'Spring has sprung!',
  },
  {
    id: 'summer',
    name: 'Summer',
    icon: '☀️',
    wallpaper: { id: 'season-summer', name: 'Summer', type: 'image', value: '/seasons/summer.svg', color: '#87ceeb' },
    colors: { primary: '#1e3a5f', accent: '#ffd700', text: '#ffffff' },
    effect: 'sparkles',
    banner: 'Hello, summer!',
  },
  {
    id: 'autumn-season',
    name: 'Autumn',
    icon: '🍂',
    wallpaper: { id: 'season-autumn', name: 'Autumn', type: 'image', value: '/seasons/autumn.svg', color: '#d2691e' },
    colors: { primary: '#8b4513', accent: '#ff8c00', text: '#ffffff' },
    effect: 'leaves',
    banner: 'Autumn is here!',
  },
  {
    id: 'winter',
    name: 'Winter',
    icon: '❄️',
    wallpaper: { id: 'season-winter', name: 'Winter', type: 'image', value: '/seasons/winter.svg', color: '#b0c4de' },
    colors: { primary: '#1a3a4a', accent: '#e0f0ff', text: '#ffffff' },
    effect: 'snowflakes',
    banner: 'Winter wonderland!',
  },
];

// Get the currently active season based on astronomical dates
export function getActiveSeason() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-indexed
  const day = now.getDate();

  // Spring: March 20 - June 20
  if ((month === 3 && day >= 20) || (month >= 4 && month <= 5) || (month === 6 && day <= 20)) {
    return SEASONS[0];
  }
  // Summer: June 21 - September 22
  if ((month === 6 && day >= 21) || (month >= 7 && month <= 8) || (month === 9 && day <= 22)) {
    return SEASONS[1];
  }
  // Autumn: September 23 - December 20
  if ((month === 9 && day >= 23) || (month >= 10 && month <= 11) || (month === 12 && day <= 20)) {
    return SEASONS[2];
  }
  // Winter: December 21 - March 19
  if ((month === 12 && day >= 21) || (month >= 1 && month <= 2) || (month === 3 && day <= 19)) {
    return SEASONS[3];
  }

  // Fallback (shouldn't reach here)
  return SEASONS[0];
}

export { SEASONS };

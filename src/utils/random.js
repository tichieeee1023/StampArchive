export const random = (min, max) => Math.random() * (max - min) + min;
export const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

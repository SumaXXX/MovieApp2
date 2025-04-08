export const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return (hash >>> 0).toString(36).padStart(7, '0');
};

export const fillArray = (cardAmount) => {
  let array = [];
  for (let i = 0; i < cardAmount; i++) array.push(i);
  return array;
};

export function truncateText(text, maxLength) {
  if (!text) return;
  if (text.length <= maxLength) {
    return text;
  }

  let truncated = text.slice(0, maxLength);

  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex !== -1) {
    truncated = truncated.slice(0, lastSpaceIndex);
  }

  return truncated + '...';
}



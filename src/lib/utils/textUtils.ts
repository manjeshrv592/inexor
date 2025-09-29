/**
 * Truncates text to a specified maximum length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters before truncation
 * @param ellipsis - The ellipsis string to append (default: "...")
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis: string = "..."
): string => {
  if (!text) return "";
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength).trim() + ellipsis;
};

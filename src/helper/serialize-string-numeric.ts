export function serializeStringToNumeric(data?: string): number | null {
  if (data === undefined) {
    return null; // Default value for undefined input
  }

  const numSerialized = parseInt(data);

  if (!isNaN(numSerialized)) {
    if (numSerialized === 0) {
      return null;
    }
    return numSerialized;
  }

  return null; // Default value for invalid input
}

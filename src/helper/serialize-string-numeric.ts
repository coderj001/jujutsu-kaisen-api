export function serializeStringToNumeric(data: string) {
    const numSerialized = parseInt(data)
    if (numSerialized) {
        if (numSerialized === 0) return 0;
        return numSerialized;
    }
    return 0
}
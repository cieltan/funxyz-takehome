export const formatLargeNumber = (value: number): string => {
    const formatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    if (value >= 1e12) {
        return `${(value / 1e12).toLocaleString(undefined, formatOptions)}T`
    }
    if (value >= 1e9) {
        return `${(value / 1e9).toLocaleString(undefined, formatOptions)}B`
    }

    return `${value.toLocaleString(undefined, formatOptions)}`
} 
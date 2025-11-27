const duration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins}m`;
};

const duration2 = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const secsStr = secs.toString().padStart(2, '0');
    return `${mins}:${secsStr}`;
};

const voteCount = (count: number) => {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(0)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
}

const currency = (ammount: string | number | null, currency: string) => {
    if (ammount == null) return '';
    const cleaned = String(ammount).replace(/[^0-9.-]+/g, '');
    const n = Number(cleaned);
    if (!isFinite(n)) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
};

const numberWithCommas = (value: string | number | null) => {
    if (value == null) return '';
    const cleaned = String(value).replace(/[^0-9.-]+/g, '');
    if (cleaned === '' || !isFinite(Number(cleaned))) return '';
    const [intPart, decPart] = cleaned.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
};

export { duration, duration2, voteCount, currency, numberWithCommas }
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
export default debounce;

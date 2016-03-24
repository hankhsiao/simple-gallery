function containsClass (target, className) {
    if (target.classList) {
        return target.classList.contains(className);
    } else {
        // For IE9
        return target.className.split(/\s+/).indexOf(className) !== -1;
    }
}

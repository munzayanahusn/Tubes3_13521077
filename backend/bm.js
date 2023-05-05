module.exports = { bmSearch };

function bmSearch(pattern, text) {
    console.log("Masuk BMSearch");
    // Convert pattern and text to lowercase
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();

    // Pre-processing: Compute Last Occurence Function Table
    const loFunc = lastOccurrence(pattern);

    let i = pattern.length - 1; // Pattern index
    if (i > text.length - 1 || i < 0) {
        // Pattern longer than text,pattern not found
        return -1;
    }

    let j = pattern.length - 1; // Text index

    // Loop to match pattern with text
    while (j <= text.length - 1) {
        if (pattern[i] === text[j]) {
            if (i === 0) {
                // Pattern found
                return j;
            } else {
                // looking-glass technique
                i--;
                j--;
            }
        } else {
            // character jump technique
            const lastOc = loFunc[text.charCodeAt(j)];
            const shift = i - lastOc;
            i = pattern.length - 1;
            j += shift > 0 ? shift : pattern.length;
        }
    }

    // Pattern not found in text
    return -1;
}

function lastOccurrence(pattern) {
    const last = new Array(128).fill(-1);

    for (let i = 0; i < pattern.length; i++) {
        const charCode = pattern.charCodeAt(i);
        last[charCode] = i;
    }

    return last;
}

/*
const pattern = "ak";
const text = "aaakdakabab";

console.log(bmSearch(pattern, text));
*/

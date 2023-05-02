function bmSimilarity(s1, s2) {
    // Konversi s1 dan s2 ke lowercase
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    // Hitung tabel bad character
    const bcTable = badCharacterTable(s2);

    let i = s2.length - 1; // Index untuk s2
    let j = s2.length - 1; // Index untuk s1
    let matched = 0; // Jumlah karakter yang cocok antara s1 dan s2

    // Loop untuk mencocokan s1 dengan s2
    while (j < s1.length) {
        if (s2[i] === s1[j]) {
            if (i === 0) {
                // Seluruh s2 cocok dengan sebagian s1
                matched += s2.length;
                i = s2.length - 1;
                j = j - s2.length + 1;
            } else {
                i--;
                j--;
                matched++;
            }
        } else {
            const bc = bcTable[s1.charCodeAt(j) - 'a'.charCodeAt(0)];
            const shift = i - bc;
            i = s2.length - 1;
            j += shift > 0 ? shift : s2.length;
        }
    }

    // Hitung persentase kemiripan
    const similarity = matched / Math.max(s1.length, s2.length) * 100;

    return similarity;
}

function badCharacterTable(s) {
    const table = new Array(26).fill(-1);

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i) - 'a'.charCodeAt(0);
        table[charCode] = i;
    }

    return table;
}

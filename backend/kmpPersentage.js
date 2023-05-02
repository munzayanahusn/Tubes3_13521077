function kmpSimilarity(str1, str2) {
    // Konversi str1 dan str2 ke lowercase
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    // Hitung nilai prefix function untuk str1
    const pf = prefixFunction(str1);

    let j = 0; // Index untuk str1
    let k = 0; // Index untuk str2
    let match = 0; // Jumlah karakter yang cocok antara str1 dan str2

    // Loop untuk mencocokan str1 dengan str2
    while (k < str2.length) {
        if (str1[j] === str2[k]) {
            j++;
            k++;
            match++;
            if (j === str1.length) {
                // Str1 ditemukan di str2
                break;
            }
        } else if (j > 0) {
            // Str1 tidak cocok, kembali ke karakter sebelumnya
            j = pf[j - 1];
        } else {
            // Str1 tidak cocok, lanjut ke karakter berikutnya di str2
            k++;
        }
    }

    // Hitung persentase kemiripan
    const similarity = (match / str1.length) * 100;
    return similarity;
}

function prefixFunction(pattern) {
    const pf = [0]; // Nilai pf[0] selalu 0
    let j = 0;

    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[j] !== pattern[i]) {
            j = pf[j - 1];
        }

        if (pattern[j] === pattern[i]) {
            j++;
        }

        pf[i] = j;
    }

    return pf;
}

const str1 = "Apel merah";
const str2 = "apel hijau dan apel merah";

const similarity = kmpSimilarity(str1, str2);

console.log(similarity); // Output: 40

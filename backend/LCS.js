module.exports = { lcs };

function lcs(pattern, text) {
    const m = pattern.length;
    const n = text.length;
    // Create a two-dimensional array to store the value of the LCS in each compared subsequence
    // initialize each element with 0
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Checks whether the characters in pattern[i-1] are the same as the characters in text[j-1]
            if (pattern[i - 1] === text[j - 1]) {
                // Equal, it means length of the longest found subsequence is increased by one.
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Not equal, it means length of the longest subsequence remains the same as in the previous subsequence.
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }

    // Last element of matrix represents the length of the longest subsequence
    const lcsLength = dp[m][n];
    // Ratio compare to text
    const ratio = lcsLength / n;
    //console.log("LCS :", ratio);

    return ratio;
}

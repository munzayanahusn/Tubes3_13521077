const FastPriorityQueue = require('fastpriorityqueue');
const prioRatio = new FastPriorityQueue((a, b) => a[0] > b[0]);

function searchQuestion(arrtext, pattern, isKMP) {
    if (isKMP) {
        found = False;
        for (let i = 0; i < arrtext.length && !found; i++) {
            result = kmpSearch(pattern, arrtext[i]);
            if (result == 0) {
                // Exact match
                found = true;
                return arrtext[i];
            }
        }
        if (!found) {
            // Question not found, find similarity
            for (let i = 0; i < arrtext.length && !found; i++) {
                ratio = lcs(pattern, arrtext[i]);
                if (ratio >= 0.9) {
                    found = true;
                    return arrtext[i];
                } else {
                    prioRatio.add([ratio, arrtext[i]]);
                }
            }
        }
        if (!found) {
            top3 = ['', '', ''];
            for (let i = 0; i < 3; i++) {
                [priority, value] = pq.poll();
                top3[i] = value;
            }
            return top3;
        }
    } else {
        found = False;
        for (let i = 0; i < arrtext.length && !found; i++) {
            result = bmSearch(pattern, arrtext[i]);
            if (result == 0) {
                // Exact match
                found = true;
                return arrtext[i];
            }
        }
        if (!found) {
            // Question not found, find similarity
            for (let i = 0; i < arrtext.length && !found; i++) {
                ratio = lcs(pattern, arrtext[i]);
                if (ratio >= 0.9) {
                    found = true;
                    return arrtext[i];
                } else {
                    prioRatio.add([ratio, arrtext[i]]);
                }
            }
        }
        if (!found) {
            top3 = ['', '', ''];
            for (let i = 0; i < 3; i++) {
                [priority, value] = pq.poll();
                top3[i] = value;
            }
            return top3;
        }
    }
}

/*
const FastPriorityQueue = require('fastpriorityqueue');

// Inisialisasi priority queue
const pq = new FastPriorityQueue((a, b) => a[0] > b[0]);

// Tambahkan elemen ke dalam priority queue
pq.add([2.5, 'apple']);
pq.add([4.2, 'banana']);
pq.add([3.1, 'orange']);

// Tampilkan elemen-elemen pada priority queue
while (!pq.isEmpty()) {
  const [priority, value] = pq.poll();
  console.log(`${value} (${priority})`);
}
*/
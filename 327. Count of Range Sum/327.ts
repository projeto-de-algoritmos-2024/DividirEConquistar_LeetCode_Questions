function countRangeSum(nums: number[], lower: number, upper: number): number {
    const prefixSum: number[] = [0];
    for (let num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }

    function mergeSortCount(start: number, end: number): number {
        if (start >= end) return 0;

        const mid = Math.floor((start + end) / 2);
        let count = mergeSortCount(start, mid) + mergeSortCount(mid + 1, end);

        let j = mid + 1, k = mid + 1, temp: number[] = [];
        for (let i = start; i <= mid; i++) {
            while (j <= end && prefixSum[j] - prefixSum[i] < lower) {
                j++;
            }
            while (k <= end && prefixSum[k] - prefixSum[i] <= upper) {
                k++;
            }
            count += k - j;

            temp.push(prefixSum[i]);
        }

        temp.push(...prefixSum.slice(mid + 1, end + 1));
        merge(temp, 0, temp.length - 1);

        for (let i = start; i <= end; i++) {
            prefixSum[i] = temp[i - start];
        }

        return count;
    }

    function merge(arr: number[], left: number, right: number): void {
        const mid = Math.floor((left + right) / 2);
        let temp = [...arr];
        let i = left, j = mid + 1;
        let k = left;
        
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                arr[k++] = temp[i++];
            } else {
                arr[k++] = temp[j++];
            }
        }

        while (i <= mid) {
            arr[k++] = temp[i++];
        }

        while (j <= right) {
            arr[k++] = temp[j++];
        }
    }

    return mergeSortCount(0, prefixSum.length - 1);
}
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    function findKthElement(arr1: number[], arr2: number[], k: number): number {
        if (arr1.length === 0) {
            return arr2[k - 1];
        }

        if (arr2.length === 0) {
            return arr1[k - 1];
        }

        if (k === 1) {
            return Math.min(arr1[0], arr2[0]);
        }

        const mid1 = Math.min(Math.floor(k / 2), arr1.length);
        const mid2 = Math.min(Math.floor(k / 2), arr2.length);

        const val1 = arr1[mid1 - 1];
        const val2 = arr2[mid2 - 1];

        if (val1 <= val2) {
            return findKthElement(arr1.slice(1), arr2, k - 1);
        } else {
            return findKthElement(arr1, arr2.slice(1), k - 1);
        }
    }

    const totalLength = nums1.length + nums2.length;

    if (totalLength % 2 === 0) {
        const mid1 = totalLength / 2;
        const mid2 = mid1 + 1;
        return (findKthElement(nums1, nums2, mid1) + findKthElement(nums1, nums2, mid2)) / 2;
    } else {
        const mid = Math.ceil(totalLength / 2);
        return findKthElement(nums1, nums2, mid);
    }
};
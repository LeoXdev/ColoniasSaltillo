package main

import (
	"fmt"
	"math"
)

func main() {
	var arr []int = []int{1, 2, 3}
	segmentTree(arr)              // tree is good to go now
	fmt.Printf("%v\n", max(1, 3)) // prints 3
}

var tree []int
var n int

// segmentTree inicializa una variable global de segmentTree, esta última debe ser de tipo slice.
func segmentTree(arr []int) {
	n = len(arr)
	tree = make([]int, n*2)
	arrayCopy(arr, 0, tree, n, n)

	for i := n - 1; i > 0; i-- {
		tree[i] = int(math.Max(float64(tree[2*i]), float64(tree[2*i+1])))
	}
}
func arrayCopy(src []int, srcPos int, dest []int, destPos int, length int) {
	copy(dest[destPos:destPos+length], src[srcPos:srcPos+length])
}

// from inclusive, to exclusive
func max(from, to int) int {
	from += n // go to second half of array
	to += n
	max := math.MinInt

	for from < to {
		if (from & 1) == 1 { // if 'from' is odd
			max = int(math.Max(float64(max), float64(tree[from])))
			from++
		}
		if (to & 1) == 1 { // if 'to' is odd
			to-- // then it's the right child
			// might as well use the parent
			max = int(math.Max(float64(max), float64(tree[from])))
		}
		from >>= 1 // walk up the next level of the tree
		to >>= 1
	}
	return max
}
func update(i, value int) {
	i += n
	tree[i] = value
	var newValue int

	for i > 1 {
		i >>= 1 // shift right is the same as divide by 2
		newValue = int(math.Max(float64(tree[2*i]), float64(tree[2*i+1])))

		if tree[i] != newValue {
			tree[i] = newValue
		} else {
			return // since no update is made
		}
	}

}

// WARNING: The given bytes must not be modified because they are the "backing" of the returned string.
/* func BytesToString(b []byte) string {
	// Ignore if your IDE shows an error here; it's a false positive.
	p := unsafe.SliceData(b)
	return unsafe.String(p, len(b))
} */
/* func StringToBytes(s string) []byte {
	p := unsafe.StringData(s)
	b := unsafe.Slice(p, len(s))
	return b
} */
// https://josestg.medium.com/140x-faster-string-to-byte-and-byte-to-string-conversions-with-zero-allocation-in-go-200b4d7105fc
// BytesToString converts bytes to a string without memory allocation.
// NOTE: The given bytes MUST NOT be modified since they share the same backing array
// with the returned string.
// Deprecated since 1.19.
// func BytesToString(b []byte) string {
// 	// Obtain SliceHeader from []byte.
// 	sliceHeader := (*reflect.SliceHeader)(unsafe.Pointer(&b))

// 	// Construct StringHeader from SliceHeader.
// 	stringHeader := reflect.StringHeader{Data: sliceHeader.Data, Len: sliceHeader.Len}

// 	// Convert StringHeader to a string.
// 	s := *(*string)(unsafe.Pointer(&stringHeader))
// 	return s
// }

// StringToBytes converts a string to a byte slice without memory allocation.
// NOTE: The returned byte slice MUST NOT be modified since it shares the same backing array
// with the given string.
// Deprecated since 1.19.
// func StringToBytes(s string) []byte {
// 	// Get StringHeader from string
// 	stringHeader := (*reflect.StringHeader)(unsafe.Pointer(&s))

// 	// Construct SliceHeader with capacity equal to the length
// 	sliceHeader := reflect.SliceHeader{Data: stringHeader.Data, Len: stringHeader.Len, Cap: stringHeader.Len}

// 	// Convert SliceHeader to a byte slice
// 	return *(*[]byte)(unsafe.Pointer(&sliceHeader))
// }

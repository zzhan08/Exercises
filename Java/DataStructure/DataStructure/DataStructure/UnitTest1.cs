using DataStructure.Datastrcutures;
using System;
using Xunit;

namespace DataStructure
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            HeapWIthCompleteBinaryTree heap = new HeapWIthCompleteBinaryTree(9);
            heap.Insert(1);
            heap.Insert(2);
            heap.Insert(3);
            heap.Insert(4);
            heap.Insert(5);
            heap.Insert(6);
            heap.Insert(7);
            heap.Insert(8);
            heap.Insert(9);
            Assert.Equal(heap.getHeap()[0], 1);
            Assert.Equal(heap.getHeap()[1], 2);
            Assert.Equal(heap.getHeap()[2], 3);
            Assert.Equal(heap.getHeap()[2], 4);
            Assert.Equal(heap.getHeap()[2], 5);
            Assert.Equal(heap.getHeap()[2], 6);
            Assert.Equal(heap.getHeap()[2], 7);
            Assert.Equal(heap.getHeap()[2], 8);
            Assert.Equal(heap.getHeap()[2], 9);

        }
    }
}

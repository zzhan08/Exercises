using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStructure.Datastrcutures
{
   public class HeapWIthCompleteBinaryTree
    {
        int[] heap;
        int size;
        int length;     
        public HeapWIthCompleteBinaryTree(int size) {
            heap = new int[size];
            length = 0;
        }
        public void Insert(int v) {
            heap[length++] = v;
            int position = length - 1;
            while (position > 2)
            {
               int half = (int)(position * 0.5);
                 int target = heap[half];
                if (target < heap[position])
                {
                    this.swap(half, position);
                    position = half;
                }
                else {
                    break;
                }
                if (position <= 2 ) {
                    target = heap[0];
                    if (target < heap[position]) {
                        this.swap(position, 0);
                    }
                    break;
                }
            }
        }
        public int[] getHeap() {
            return heap;
        }
        private void swap(int position1, int position2) {
            int temp = heap[position1];
            heap[position1] = heap[position2];
            heap[position2] = temp;
        }
    }
   
}

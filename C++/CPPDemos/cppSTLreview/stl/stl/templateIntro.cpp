#include "stdafx.h"
namespace mytemplate {
    template<typename T> 
    T square(T x) {
        return x*x;
    };
    template<typename T>

    class bovector {
        T arr[1000];
    public:
        int size;

        bovector() :size(0) {}
        void push(T x) { arr[size] = x; size++; }
        void print() const { for (int i = 0; i < size; i++) { std::cout << arr[i] << std::endl; } }
     
    };
}

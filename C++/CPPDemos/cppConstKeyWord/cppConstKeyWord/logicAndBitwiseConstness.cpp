#include "stdafx.h"
#include <iostream>
#include <vector>

class BigArray {
    std::vector <int> v;
    int accessCounter;
    int *v2;
    mutable int accessCounter2;
public:
    int getItem(int iter) const{
        //accessCounter++; //bitwise constness, canont change any member variables
        //const_cast<BigArray*>(this)->accessCounter++;
        accessCounter2++;
        return v[iter];
    }
    void setItem(int index, int value) const {
        *(v2 + index) = value; // not chnage memebr directlly;
    }
    const int*const fun(const int* const& p) const {
        return 0;
    }
};
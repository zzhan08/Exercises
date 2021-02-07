#pragma once
#ifndef BITWISE
#define BITWISE
#include <vector>
class BigArray {
	
public:
	std::vector<int>v;
	mutable int accessCounter;
	int *v2;//int array
	int getItem(int index) const {
		accessCounter++;
		return v[index];
	}
	void setV2Item(int index, int x)  {//maintain bitwise constness of class, function  accepted
		*(v2 + index) = x;
	}
};
#endif
#include "stdafx.h"
#include <iostream>
#include <string>

class functorX {
    std::string name;
public:
    functorX(std::string n) {
        name = n;
    }
    void operator()() {
        std::cout << "functor working: "<< name << std::endl;
    }
    operator std::string() { // type conversion function
        return name;
    }
};
class functorAdd {
    int value;
public:
    functorAdd(int n) {
        value = n;
    }
    void operator()(int add) {
        std::cout << "functor working: " << value + add<< std::endl;
    }
    
};
class lbless {
public:

    bool operator()(int add, int y) {
        return (add % 10) < (y % 10);
    }

};
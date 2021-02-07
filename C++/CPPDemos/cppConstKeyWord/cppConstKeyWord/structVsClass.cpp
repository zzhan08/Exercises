#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>

struct person_t {
    // public
    // data container
    int age;
};
class person {
    // private
    // more complex data strcutur with api to outside 
    // datamemebr name with name__
    int age;

public:
    void setAge(int a) {
        age = a;
    }
    int Age() {
        return age;
    }
};
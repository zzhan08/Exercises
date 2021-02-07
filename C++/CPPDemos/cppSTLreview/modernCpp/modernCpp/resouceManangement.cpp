#include "stdafx.h"
#include <string>
#include <iostream>

class rmPerson {
    std::string* name;
public:
    rmPerson(std::string n) :name(new std::string(n)) {};
    ~rmPerson() {
        delete name;
    }
    void printName() {
        std::cout << *name << std::endl;
    }
    rmPerson( rmPerson&& rp) = default;
};
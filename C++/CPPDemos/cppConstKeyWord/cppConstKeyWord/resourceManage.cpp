#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>
class reManager {
    reManager(const reManager& n) {
        name_ = new std::string(*n.getName());
    }
    reManager& operator=(const reManager& n) {
        name_ = new std::string(*n.getName());

    }
    std::string* name_;
public:
    reManager(std::string n) {
        name_ = new std::string(n);
    }
    ~reManager() {
        delete  name_; // delete reference, shodow copy in array's name will be deleted
                       // define copy construct for deep copying
    }
   
    std::string* getName() const {
        return name_;
    }
    void print() {
        std::cout << *name_ << std::endl;
    }
};
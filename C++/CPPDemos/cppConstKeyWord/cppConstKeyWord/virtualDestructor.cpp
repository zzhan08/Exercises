#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
class virt{
public:
    virtual ~virt() {// define virtual for base destructor will delete all memory been created otherwise only base class be deleted
        std::cout << " virtual base is destructed" << std::endl;
    }
};
class virtDestructor : public virt {
public:
    ~virtDestructor() {
        std::cout << " virtual destructor is destructed" << std::endl;
    }
};
class vtDestructorFactory {
public:
    static virt* createVD() {
        return (new virtDestructor());
    }
    // if dont use virtual destructor for delete virt and virtDestructor memery
    // shared pointer can be used to delete virt and virtDestructor memery
    // unique ptr not do the job
    static std::shared_ptr<virt> createVDshared() {
        return std::shared_ptr<virt>(new virtDestructor());
    }
};
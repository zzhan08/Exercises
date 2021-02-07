#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
class vfnCOD {
public:
    vfnCOD() {
        std::cout << "base born" << std::endl;
        show();// during initialition dynamic binding willnot work, so vfnCODChild's show function will not be called and based show will be called
    }
    virtual void show() {
        std::cout << "base show" << std::endl;

    }
    void showDIff() {
        show();
    }
    ~vfnCOD() {
        std::cout << "base delete" << std::endl;

        show();// during delete dynamic binding willnot work, so vfnCODChild's show function will not be called and based show will be called
    }
};
class vfnCODChild : public vfnCOD {
public:
    vfnCODChild() {
        std::cout << "child born" << std::endl;

    }
    void show() { // when base function is virtual, inherited fn will be virtual -> dynamic binding
        std::cout << "child show" << std::endl;

    }


};
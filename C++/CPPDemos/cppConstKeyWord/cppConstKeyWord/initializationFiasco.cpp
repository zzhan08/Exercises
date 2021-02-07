#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>

class fiaso2 {
    std::string name;
public:
    void show2() {
        std::cout << "show fiaso2 " << name << std::endl;
    };
    fiaso2(std::string n) {
        std::cout << "fiaso2 " << name << " is born"<< std::endl;

        name = n;
    }
};

class fiaso {
    std::string name;
public:
    void show() {
        std::cout << "show fiaso " << name << std::endl;
    };
    //iaso2 thetwo(name);

    fiaso(std::string n) {
        std::cout << "fiaso " << name << " is born" << std::endl;
        //.show2();
        name = n;
    }
};
class singleTon {
    static fiaso * fiaso1;
    static fiaso2 * fiastwo2;

    static fiaso * getfiaso() {
        return fiaso1;
    };
    static fiaso2* getfiaso2() {
        return fiastwo2;
    }
    ~singleTon() {};
};
#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
class preExcLeavDest {
public:
    std::string m_name;
    preExcLeavDest(std::string name) {
        m_name = name;
        std::cout << m_name << " is born. " << std::endl;
    }
    void prepareThrowException() {
        throw 20;// use different funciton to throw exception instead of use destructor
    }
    ~preExcLeavDest() {
        std::cout << m_name << " is destoryed. " << std::endl;
        //throw 20; // formultiple instance exception will not be caught// should not throw exception
        try {
            throw 20;
        }
        catch (std::exception e) {
        }
        catch (...) {
            // catch any exception without error message
        }
    }
    void show() {
    }
};
#include "stdafx.h"
#include <iostream>

#include <string>
class dog {
    int age;
    std::string name;
public:
    dog() {
        age = 3;
        name = "foo";

    }
    void setAge(const int& a) {
        age = a;
        std::cout << "const set age" << a << std::endl;

    }
    void setAge(int& a) {
        age = a;
        std::cout << "nonconst set age" << a << std::endl;
    }
    void setAge1(const int a) {
        age = a;
        // const is useless
    }
    const std::string & getName() {
        return name;
        // return name is reference
    }
    const std::string  getName1() {
        return name;
        // const is useless, return name is value
    }
    void  printName() const {
      // const funciton will not change any member variable]
        std::cout << name << age<< " const dog" << std::endl;
        //age++; 
        // overloaded function when dog is const, const function is called
    }
    void  printName() {
        // const funciton will not change any member variable]
        std::cout << name << age <<"non const dog" <<std::endl;
        //age++; 
        // overloaded function when dog isnot const, non-const function is called

    }
};
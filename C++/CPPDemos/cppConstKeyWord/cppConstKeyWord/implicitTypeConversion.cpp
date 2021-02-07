// standard type conversion
// user defined type conversion
#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>
// implicit starnard type
class implicity {
public:
    implicity(std::string name) {// construcotr with single parmeter is construcotr + type converter
        name_ = name;
    }
    std::string getName() const {
        return name_;
    }
    operator std::string() {
        return name_;
    }
private:
    std::string name_;
};
class impliRa {
public:
    impliRa(int numerator=0, int dennominator=1):num(numerator),den(dennominator) {}
    int num;
    int den;
    const impliRa operator*(const impliRa& ir) {
        return impliRa(num*ir.num, den*ir.den );
    }
    operator int() {
        return num / den;
    }
};
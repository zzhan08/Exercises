#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>

class lock {
private:
    std::mutex *aa;
public:
    lock(std::mutex* bb) {
        bb->lock();
        aa = bb;
    }
    ~lock() {
        aa->unlock();
    }
};
class sainit {};
class sadog {};
class sadogtrick {};
class lock2 {
private:
    std::shared_ptr<std::mutex> mu;
public:
    //explicit lock2(std::mutex* bb):mu(bb, std::mutex::unlock) {// copy construcotr with shared pointer to prevent memory leak
                                              // shared_ptr(type *ptr, deleter) std::mutex::unlock->deleter
    //    bb->lock();
    //};

};
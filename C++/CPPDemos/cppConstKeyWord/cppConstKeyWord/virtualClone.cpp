#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>
class virtualClone {
public: 
    virtual virtualClone * deepcopy() {
        return new virtualClone(*this);
    }
};
class clone : public virtualClone {
    clone * deepcopy() {
        return new clone(*this);
    }
};
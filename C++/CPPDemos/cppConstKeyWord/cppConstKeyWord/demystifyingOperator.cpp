#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
#include <mutex>

/*void * operator new(std::size_t size) throw(std::bad_alloc) {
    while (true) {
        void * pMem = malloc(size);
        if (pMem)
            return pMem;
        // new_handler invoke when fail to alloc the memory
        std::new_handler handler = std::set_new_handler(0);
        std::set_new_handler(handler);
        if (handler) {
            (*handler)();// old handler not null, invoke new handler funtion again, handler will free up memory
        }
        else {
            throw std::bad_alloc();
        }
    }
}*/
class newMem {
public:
    static void* operator new(std::size_t size) { // cannot be virtual when already static 
                                                  // static => hehavirour of class, virtual -> behavirou of object
                                                  // create a virtual destrucotr

        if (size == sizeof(newMem))
            std::cout << "newMem" << size; // always create newMem
        else
            std::cout << "not newMem";

        return 0;
    }
    static void operator delete(void * memory) throw() {
        std::cout << "delete newMem" << std::endl;
        ::free(memory);
    }
    virtual ~newMem() {
    }
};
class newerMem : public newMem {
    int age;
    std::string name;
public:
    newerMem() {
        std::cout << sizeof(newerMem) << "|" << sizeof(newMem) << std::endl;
    };
    static void operator delete(void * memory) throw() {
        std::cout << "delete newerMem" << std::endl;
        ::free(memory);
    }
};
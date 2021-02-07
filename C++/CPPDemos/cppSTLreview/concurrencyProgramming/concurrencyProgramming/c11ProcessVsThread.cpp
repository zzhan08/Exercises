#include "stdafx.h"
#include <iostream>
#include <thread>
#include <string>
#include <mutex>

#include <fstream>
class fctor {
public:
    void operator()(std::string& msg) {
        //for (int i = 0; i > -100; i--) {
        std::cout << "from t1" << msg << std::endl; 
            msg = "x";
       // }
    }
};
class logfile {
    std::mutex m_mutex;
    std::ofstream f;// f  should not be accessed by outside, should not pass f as parameters
public:
    logfile(){
        f.open("log.txt");
    }
    void shared_print(std::string id,int value)
    {
        std::lock_guard<std::mutex> locker(m_mutex);
        f << "From " << id << ":" << value << std::endl;
    }
};

class stack {
    int* data;
    std::mutex mu;
public:
    void pop();// pops off the itemon top of stack
    int& top();//return s the item on top
};
// concurrencyProgramming.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "c11ProcessVsThread.cpp"
std::mutex mu;

void shared_print(std::string msg, int id) {
    //mu.lock();
    std::lock_guard<std::mutex>guard(mu);//auto unlock
    std::cout << msg << id << std::endl;
   // mu.unlock();
}
void function_1() {
    for (int i = 0; i < 100;i++) {
        shared_print(std::string("from f1"),i);
    }
}
void function_11(logfile& log) {
    for (int i = 0; i < 100; i++) {
        log.shared_print(std::string("from f1"), i);
    }
}
void c11ProcessVsThread() {
    // threads comunicate throught shared memroy(faster) - difficult to implement
    // process communicate throught interprocess conmmunication - more overhead(more protection) + easier to run distributed system
    //std::thread t1(function_1);
    //t1.join();// main thread waits for t1 to finish
   // t1.detach();// t1 will freely on tis own -- daemon process
   // if (t1.joinable())t1.join();
    //std::thread t2(function_1);
    // solution 1
    /*try {
        for (int i = 0; i < 100; i++) {
            std::cout << "println iter: " << i << std::endl;
        }
      

    }
    catch (std::exception e) {
        t2.join();
        throw;
    }
    t2.join();*/
    //solution 2
    // resource acquisition
    // wapper funciton for thread to protect thread to join
    
    //thread with functor
    fctor fct;
   // std::thread tx(fct);
    //std::string s = "is one print this";
   // std::thread tx1((fctor()), std::ref(s));// parameter of thread always passed by value
                                  // use std::ref to send param by reference
                                  // use std::move() to move s from main to child process
   // std::thread t2 = std::move(tx1);// thread cannot be copied
   // std::this_thread::get_id();
   // t2.get_id();
  //  try {
  //      for (int i = 0; i < 100; i++) {
   //         std::cout << "println iter: " << i << std::endl;
  //      }
   //     std::cout << "s " << s << std::endl;

   // }
   // catch (std::exception e) {
   //     tx1.join();
   //     throw;
   // }
   // tx1.join();
   // std::thread t1(function_1);
    //for (int i = 0; i < 100; i++)
    //    shared_print(std::string("From main: "), i);

    //t1.join();
    logfile lg;
    std::thread t1(function_11, std::ref(lg));
    for (int i = 0; i < 100; i++)
        lg.shared_print(std::string("From main: "), i);
    t1.join();
    // avoid data race 1.mutex 2. never leak handle of data to outside3.design properly
}
int main()
{
    c11ProcessVsThread();
    return 0;
}


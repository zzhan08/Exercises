// concurrentprogramming.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include<thread>
#include <iostream>
#include<string>

using namespace std;

/*********************************************C++ Threading #1: Introduction************************************************
void funcPrint() {
	cout << "Beautiful is only skin deep" << endl;
}
int main()
{
	std::thread t1(funcPrint);
	// t1.join();//main thread wait for t1 to finish
	t1.detach();//main thread not wait for t1 to finish, t1 run on itself -- t1 become daemon process
	// only allow join or detach once 
	if (t1.joinable()) {
		cout << "t1 is joinable" << endl;

		t1.join();
	}else 		cout << "t1 is not joinable" << endl;

	funcPrint();
    return 0;
}*/
/*********************************************C++ Threading #2: thread management***********************************************
void funcPrint() {
	cout << "Beautiful is only skin deep" << endl;
}
class fctor {
public:
	void operator ()() {
		for (int i = 0; i > -100; i--) {
			cout << "fomr t1 " << i << endl;
		}
	}
	~fctor() {
		delete mu;
	}
};
class fctor2 {
public:
	
	void operator ()(string& msg) {                               // & not work, parameter of thread always passed by value
		cout << "t1 says: " << msg << endl;
		msg = "aaaaaaaaaaa";
	}

};*/
//int main() {
	/*
	//std::thread t1(funcPrint);// t1 is starting runing
    // have to choose to join or detach, otherwise program terminate
	// using Resource aquisition is initializtion approach
	// Wrapper w(t1);
	//fctor fct();
	//std::thread t1(fct);
	//std::thread t1((fctor()));
	string s = "asdfdsafasdf";
	std::thread t1((fctor2()),s);                                   // parameter of thread always passed by value, use std::ref()|std::move()
	std::thread t2((fctor2()), std::ref(s));                        // now it pass by reference
	std::thread t3((fctor2()), std::move(s));                       // now it pass by reference
	//std::thread t4 = t1;// no copy for thread
	std::thread t4 = std::move(t1);// only use move function ot copy
	cout << t3.get_id() << endl;

	try {// 
		//for (int i = 0; i < 100; i++) {
			cout << "from main: " << s << endl;
		//}
	}
	catch (...) { t1.join(); 
	throw;
	};
	
	t1.join();
	*/
	// oversubscription 
	//std::thread::hardware_concurrency();//return number of thread can be run
//}
/*********************************************C++ Threading #3: race condition and mutex**********************************************
//avoid data race
// 1. use mutex 
// 2. not leak data handle outside
// 3. design interface appropritly 
#include<mutex>
#include<fstream>
mutex mu;
void shared_print(const string& host, const int& cumulate) {
	std::lock_guard<std::mutex> guard(mu);// use lock_guard instead mu.lock()
	//mu.lock();
	cout << host << ": "<<cumulate << endl;              // this line throw exception mu will be locked forever=>mu.lock() not recommanded
	//mu.unlock();
}
void funcPrint() {
	string a = "from t1";
	for (int i = 0; i > -100; i--) {
		//mu.lock();
		// cout<< "fomr t1 " << i << endl;
		//mu.unlock();
		shared_print(a,i);
	}
}
class logfile {
	mutex mus;
	ofstream f;
public:
	logfile() {
		f.open("aa.txt");
	}
	void shared_print(const string& host, const int& cumulate) {
		std::lock_guard<std::mutex> guard(mus);
		cout << host << ": " << cumulate << endl;              
															   
	}
	// never return f to outside world to access ofstream& getSteream(){return f;}
	// never pass f as an argument to user provided function void processf(void fun(ofstream&)){fun(f);}

};
class stack {
	mutex mu;
	int*data;
public:
	void pop();//pop off item on top of stack
	int&top();//return item on top

};
void function_2(stack &st) {
	int i = st.top();
	st.pop();
	//process(v);
}
void function_1(logfile &lf) {
	for (int i = 0; i > -100; i--) {
		lf.shared_print(string("from t1"), i);
	}
}
int main() {*/
	/*thread t1(funcPrint);
	string a = "from main";
	for (int i = 0; i < 100; i++) {
		//mu.lock();
        //	cout << "from main: " << i << endl;
	    // mu.unlock();
		shared_print(a, i);
	}
	t1.join();*/
	/*logfile log;
	std::thread t1(function_1, std::ref(log));
	for (int i = 0; i < 100; i++) {
		log.shared_print(string("from main"), i);
	}
	t1.join();
}*/
/*********************************************C++ Threading #4: deadLock**********************************************/
#include<mutex>
#include<fstream>

class logfile {
	mutex mus;
	ofstream f;
public:
	logfile() {
		f.open("aa.txt");
	}
	void shared_print(const string& host, const int& cumulate) {
		std::lock_guard<std::mutex> guard(mus);
		cout << host << ": " << cumulate << endl;

	}
	// never return f to outside world to access ofstream& getSteream(){return f;}
	// never pass f as an argument to user provided function void processf(void fun(ofstream&)){fun(f);}

};
int main() {
}

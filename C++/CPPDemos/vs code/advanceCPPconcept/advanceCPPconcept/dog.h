#ifndef DOG
#define DOG
#include <string>
#include<iostream>
class dog {
public:
	dog(std::string name) { std::cout<< name <<"dog name"<< std::endl; };
	//void destroyMe() { delete this; }
private:
	~dog() { std::cout << "dog destory" << std::endl; };
};

#endif
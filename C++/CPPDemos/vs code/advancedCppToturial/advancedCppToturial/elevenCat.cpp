#include "stdafx.h"
#include "elevenCat.h"
#include "elevenDog.h"
 elevenDog ddd("sdfdsf");
 void elevenCat::meow() {
	 std::cout << "cat " << _name << " start meow" << std::endl;

 }
elevenCat::elevenCat(char* name) {
	std::cout << "cat " << name << " HAS BORN" << std::endl;
	_name = name;
	ddd.bark();
}

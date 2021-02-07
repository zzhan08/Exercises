#include "stdafx.h"
#include "elevenDog.h"
#include "elevenCat.h"

elevenCat c("cat_c");
void elevenDog::bark() {
	std::cout << "DOG " << _name << " Start barking" << std::endl;
}
elevenDog::elevenDog(char* name) {
	std::cout << "DOG " << name << " HAS BORN" << std::endl;	
	_name = name;
	c.meow();
}

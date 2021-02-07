#pragma once
class elevenDog;
class elevenCat;
class Singleton {
	static elevenCat* ec;
	static elevenDog* ed;
public:
	~Singleton();
	static elevenDog* getDog();
	static elevenCat* getCat();
};
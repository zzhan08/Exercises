// modernCPP.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <vector>
#include <iostream>
#include <stdlib.h>  
#include <string>
#include <assert.h>
#include <initializer_list>
/*++++++++++++++++++ 1. C++ 11 ++++++++++++++++++++ 
//******************&1.initializer list******************

class boVecotr {//define custormized initializer_list constructor
	std::vector<int> m_vec;
public:
	boVecotr(const std::initializer_list<int>&v) {
		for (std::initializer_list<int>::iterator itr = v.begin(); itr != v.end(); itr++) {
			m_vec.push_back(*itr);
		}
	}

};
//******************&2. Uniform initialization******************
//c++03 aggregate class or struct
class dog {
public:
	int age;
	std::string name;
};
class dog3 {
public:
	int age;                                   //3rd choice
	dog3(int a) {                              //2nd choice
		age = a;
	}
	dog3(const std::initializer_list<int>&v) { //1st choice
		age = *(v.begin());
	}
};

//c++ 11 extended the scope of curly brace initialization
class dog2 {
public:
	dog2(int age, std::string name) {};
};
void foo(int i) { std::cout << "foo_int" << std::endl; }
void foo(char* i) { std::cout << "foo_int" << std::endl; }
//******************&8. Delegating constructor******************
class dog8 {// bad bad attempt maybe java not in c++ may create two dog8s
public:
	dog8() {}
	dog8(int a) {
		dog8();
		//do another function  doOtherThing(a);
	}
};
//c++ 03
class dog81 {
	void init() {};
	public:
		dog81(){ init(); }
		dog81(int a) {
			init();
			//do another function  doOtherThing(a);
		}

};
//cons:1 cumbersome code. 2. init() could be invoked by other functions
//c++ 11
class dog82 {
	int age = 9;// in class initialization
public:
	dog82() {  }
	dog82(int a) : dog82(){
		//do another function  doOtherThing(a);
	}

};
//******************&9. override (for virtual function) ******************
//c++ 03
class dog9 {
	virtual void a(float);//change function parameter type create new function
	virtual void b() ;    //lost const create new function
	//virtual void a(char) override; //override key word tell compiler this function is inheritance fucntion make sure funciton override correctlly
	//virtual void b(float) override;
};
//******************&10. final (for virtual function && class) ******************
//c++ 03
class dog10 final{//no class can derived from dog10

};
class yellowDog10 {
	virtual void a(int a)final { // function cannot be override
	};
};
//******************&11. Compiler Generated Default Constructor ******************
//c++
class dog11 {
	dog11(int age) {}//compiler willnot generate default constructor
};
//c++11
class dog111 {
	dog111(int age);
	dog111() = default; //force compiler to generate the default constructor
};
//******************&12. Delete ******************
//delete functions
//c++ 03
class dog12 {
public:
	dog12(int age) {}
};
//c++ 11
class dog121 {
public:
	dog121(int age) {}
	dog121(double) = delete;
	dog121 & operator=(const dog121&) = delete;

};
//******************&13. constexpr ******************
int a13() { return 3; }
//c++ 11
constexpr int a131() { return 3; }//force computation happen at compile time, always return const value
//write faster program with constexpr
constexpr int cubed(int x) { return x*x*x; }
template<typename func>//create function template, func is placeholder name of type func
void filter14(func f, std::vector<int>arr) {
	for (auto i : arr) {
		if (f(i))
			std::cout << i << " ";
	}
}
int main()
{ 
	//c++ 03 initialze list:
	int arr[4] = {3,2,4,5};
	std::vector<int>v;
	v.push_back(3);
	v.push_back(2);
	v.push_back(4);
	v.push_back(5);
	//c++ 11 initialize list:
	std::vector<int>vw = { 3,2,4,5 };//calling initializer_list constructor
	//all relevant stl container updated to accept initializer_list
	//customized boVector;
	boVecotr bc = { 1,2,3,4 };
	boVecotr cd{ 1,2,3,4 }; //effectively the same
	std::vector<int> a = { 2,3,4,5 };
	dog d1 = {5,"Henry"};//Aggregate Initialization
	dog2 d2 = { 5,"Henry" };
	// Uniform initialization search order:
	// 1. initializer_list constructor
	// 2. regular constructor that takes the appropriete  parameters.
	// 3. Aggregate initializer
	// ******************&3. auto type***************
	std::vector<int> vec = { 1,2,3,4 };
	std::vector<int> M_ve;
	//c++ 03
	for (std::vector <int>::iterator it = vec.begin(); it != vec.end(); ++it) {
		M_ve.push_back(*it);
	}
	//c++ 11
	//c++ 03
	for (auto it = vec.begin(); it != vec.end(); ++it) {
		M_ve.push_back(*it);
	}
	auto as = 6;//int
	auto b = 6.6;//double
	auto c = as;//int
	//IDE becomes more important
	// ******************&4 for each******************
	// c++ 03
	for (std::vector<int>::iterator itr = v.begin(); itr != v.end();++itr) {
		std::cout << (*itr);
	}
	// c++ 11
	for (int i : v) {
		std::cout << i;
	}
	for (auto &i : v) {                //&i is member in v
		i++;                           //change value in v
		std::cout << i;
	}
	// ******************&5 nullptr******************
	//  To replace NULL in c++ 03
	foo(NULL); //Ambiguity because it doesnot know if NULL is interger or char pointer
	//c++ 11;
	foo(nullptr); //call foo(char*) | nullptr is char
	// ******************&6 enum class******************
	//c++03
	enum apple {green_a,red_a};  // green_a==0   red_a==1
	enum orange { big_o, small_o }; // big_o==0   small_o==1
	apple a3 = green_a;
	orange o3 = big_o;
	if (a3 == o3) {
		std::cout << "green apple and big orange same" << std::endl;
	}
	else {
		std::cout << "green apple and big orange not same" << std::endl;
	}
	enum class apple1 { green_a1, red_a1 };  // green_a==0   red_a==1
	enum class orange1 { big_o1, small_o1 }; // big_o==0   small_o==1
	apple1 a4 = apple1::green_a1;
	orange1 o4 = orange1::big_o1;
	//if (a4 == o4) { //fail to compile ==operator between apple1 and orange1 not defined
	//	std::cout << "green apple and big orange same" << std::endl;
	//}
	//else {
	//	std::cout << "green apple and big orange not same" << std::endl;
	//}
	// ******************&7 enum class******************
	// run time assert (c++ 03)
	assert(a3 == o3);
	//compile time assert (c++ 11)
	static_assert(sizeof(int) == 4,"not corrected");
	// ******************&12 delete ******************
	dog12 d12(2);
	dog12 d120(22.0); // 3.0 converted from double to int
	d12 = d120;       // compiler generated assignment operator

	dog121 d121(2);
	//dog121 d1201(22.0); //double param constructor is deleted
	//d121 = d1210;       //auto generated operator = is deleted 
	//******************&13. constexpr ******************
	int arr13[6];//ok
	//int arr131[a13() + 3];//compile error
	int arr131[a131() + 3]; // create this array
	int y = cubed(1987);//compute at compile time
	//while (true) {
		int d = rand() + 1;

		int e = cubed(d);
		std::cout << "e: " << e << std::endl;
	//}
	//******************&14. New String Literals ******************
	//c++ 03
	char * a4545 = "string";
	//c++ 11

	char * ba14 = u8"string";
	char16_t * c14 = u"abc\0def";
	char32_t * d14 = U"string";
	char * e14 = R"(string \\)";
	//******************&15. lambda fucntion ******************
	// function programming
	std::cout << [](int x, int y) {return x + y; }(3,4) << std::endl;
	auto f = [](int x, int y) {return x + y; };
	std::cout << f(3, 4) << std::endl;
	std::vector<int>a14 = { 1,2,3,4,5 };
	filter14([](int x) {return x > 3; }, a14);
	int i14 = 4;
	filter14([&](int x) {return x > i14; }, a14);// & tell compiler enable variable capture, so lambda function can access outside variable i14

}*/
/*++++++++++++++++++ 2. C++ 11 Rvalue reference: move semantics ++++++++++++++++++++
//void printInt(int a) { std::cout << "print int a"<<a << std::endl; };   //make ambiguis call make conflict
void printInt(int &a) { std::cout << "print int &a" << a << std::endl; };
void printInt(int &&a) { std::cout << "print int &&a" << a << std::endl; };
class boVector {
	int size;
	double * arr_; //big array
public:
	boVector(const boVector& rhs) {//copy constructor
		size = rhs.size;
		arr_ = new double[size];
		for (int i = 0; i < size; i++) { arr_[i] = rhs.arr_[i]; }
	}
	boVector(const boVector&& rhs) {//move constructor save operator to passed Rvalue parameter
		arr_ = rhs.arr_;
	}
	~boVector() { delete arr_; }

};
void foo(boVector v) {

};
boVector createBoVector();
void foo_by_value(boVector v);      //make mass has to write alot funciton to achieve this purpose to distinguish between refence and value if move constructor not defined inside class
void foo_by_reference(boVector &v); //make mass has to write alot funciton to achieve this purpose to distinguish between refence and value if move constructor not defined inside class
// note 2: move semantics is implemented for all stl containers which means a. move to c++ 11 code will be fast b. passing by rvalue can be used for stl containers
void hoo(std::string s);
bool goo(std::vector<int>&arg);
std::vector<int> foo() { return std::vector<int>{1,2,3,4,5}; }

int main()
{
	int a = 5;   //a is lvalue
	int &b = a;  //b is lvalue reference (reference)
	int &&c = 5;     //c is rvalue reference
	printInt(a); // call lvalue reference funciton printInt(int &a)
	printInt(6); // call rvalue reference funciton printInt(int &a)
	boVector reusable = createBoVector();
	foo(reusable);// call copy() constructor, but we dont want lvalue to be copy we want use directly so we can call std::move() to make it rvalue
	foo(std::move(reusable));// std move() make lvalue to be rvalue so original lvalue will not be treated as rvalue then it will call move constructor however, reusable.arr_ = nullptr after move(),, reusable shouldnt be used again
	foo(createBoVector());//pass rvalue reference to function call move constructor
	foo_by_reference(reusable); // call no constructor because foo(rvalue) will call copy constructor, most effeciient 
	foo_by_value(reusable);
	foo_by_reference(createBoVector());
	//note 1: most usefull place for rvalue reference is overloading copy constructor and copy assignment operator to achieve move semantics
	template<typename X>
	X& X::operator=(X const &rhs) {};
	template<typename X>
	X& X::operator=(X &&rhs);
	//move constructor/move assignment operator: remove costly and unnecessary deep copying
	//1.  particularly powerful passing by reference and passing by value
	//2.  offer finer control of which part of your object to be moved
	return 0;   
}*/
/*++++++++++++++++++ 3. C++ 11 Rvalue reference: perfect forwarding ++++++++++++++++++++ 
class boVector {
	int size;
	double * arr_; //big array
public:
	boVector(const boVector& rhs) {//copy constructor
		size = rhs.size;
		arr_ = new double[size];
		for (int i = 0; i < size; i++) { arr_[i] = rhs.arr_[i]; }
	}
	boVector(const boVector&& rhs) {//move constructor save operator to passed Rvalue parameter
		arr_ = rhs.arr_;
	}
	~boVector() { delete arr_; }

};
boVector createBoVector();

void foo(boVector arg);
template<typename T>
//void relay(T arg) {//param type may change from relay() to foo() 
//	foo(arg);
//}
void relay(T&&arg) {// perfect forwarding  depend on how arg initialized when arg is rvalue T&& is rvalue, arg is lvalue T&& is lvalue based ont reference colapsing rules
	foo(std::forward<T>(arg));
}

//1 referene colapsing rules(c++11)
// 1. T& &   ==> T&
// 2. T& &&  ==> T&
// 3. T&& &  ==> T&
// 4. T&& && ==> T&&
//2 remove reference on type (c++11)
template<class T>
struct std::remove_reference;
//T is int&
std::remove_reference<int&>::type i;//int i
//T is int
std::remove_reference<int>::type i;//int i
//implemenatation of std::ford()
template<class T>
T&& forward(typename std::remove_reference<T>::type& arg) {
	return static_cast<T&&>(arg);
}
//std::move() vs std::forward()
template<typename T>
//std::move<T>(arg);//turn arg into rvalue type
//std::forward<T>(arg);// turrn arg to type T&&

int main()
{
	boVector reusable = createBoVector();
	relay(reusable);
	relay(createBoVector());
	relay(9);//==> T = int&& ==>T&&=int&& && = int&&
	int x = 9;
	relay(x);//==> T = int& ==>T&&=int& && = int&
	//T&& is universal reference when T is template type and type deduction happens to T(T is function template type not class template type)
	return 0;
}*/
/*++++++++++++++++++ 4. C++ 11 User defined literals ++++++++++++++++++++ 
//literals are constants
//c++ has 4 kinds of literals
  //interger ------ 45
  //floating point ---4.5
  //character --- 'z'
  //string --- "dog"
//45;//int literal
//45u;//unsigned int literal(suffix specifies type)
//45l //long
//user defined literals
const long double operator "" _cm(long double x) { return x * 10; }  //const make calculation at compile time save runtime cost
const long double operator "" _m(long double x) { return x * 1000; }
const long double operator "" _mm(long double x) { return x * 100; }
//using c++ call is more complex to achieve below than using build in type
//User defined literals pushes this effort even further
int operator"" _bin(const char* str, size_t l) {
	int ret = 0;
	for (int i = 0; i < l; i++) {
		ret = ret << l;
		if (str[i] == '1') {
			ret += l;
		}
	}
	return ret;
}
//Restriction: it can only work with following parameters:
//char const*
//unsigned long long
//long double
//char const*, std::size_t 
//wchar_t const*, std::size_t
//Note: return value can be of any types
int main()
{
	//c++ 99
	long double height = 3.4_cm;//meters?centimeters?inches?
	//height = 3.4cm;
	//ratio = 3.4cm/2.1mm;//ratio=3.4*10/2.1   unit tranmation means runtime cost
	std::cout << height << std::endl;
	std::cout << height+13.0_mm << std::endl;
	std::cout << "110"_bin << std::endl;
	return 0;
}*/
/*++++++++++++++++++ 5. C++ 11 Compiler Generated Functions ++++++++++++++++++++
//c++03 auto generated function
   //1.default constructor(only when  not constructer declare by user) 
   //2. copy constructor (generate only when not 3, 4, 5, 6 declare by user)
   //3. copy assignment operator(generate only when 2, 4, 5, 6 not declare by user)
   //4.destructor
//c++ 11:two more auto funciton 
   //5 move constructor generated only if 2,3,4,6 not declared by user
   //6 move assignmentoperator only if 2 3 4 5 not declared by user
class Dog {};//123456 canbe generated

class cat {   // 3,4 canbe generated
	cat(const cat&) {}//copy constructor make copy assignment operator to be deprecated
	cat& operator=(const cat&) {};//bring back deprecated back
};
class duck {   // only 4 canbe generated
	duck(const duck&&) {}//move constructor
};
class frog { //4 be generated
	frog(frog&&, int=0) {}//move constructor
	frog(int = 0) {}//default constructor
	frog(const frog&, int = 0) {}//copy constructor 
};
class fish {// 1,2,3 be generated

	~fish() {}//make 2,3 to be deprecated redefine 2,3 bring them back
};
class cow { //1,2,4,(5,6 not be genereted because delele copy assignment operator treated as declare to function) (2 is deprecated)
	cow& operator=(const cow&) = delete;//make copy constructor be deprecated
	cow(const cow&) = default;// bring deprecated function back

};
int main()
{
	return 0;
}*/
/*++++++++++++++++++ 6. C++ 11 library: shared pointer - 1 ++++++++++++++++++++*/
#include<memory>
class dog {
	std::string name_;
public:
	dog(std::string name) {
		std::cout << "dog " << name << " is now created" << std::endl;
		name_ = name;
	}
	dog() {
		std::cout << "namless dog  is now created" << std::endl;
		name_ = "nameless";
	}
	~dog() {
		std::cout << "dog " << name_ << " is now destoried" << std::endl;
	}
	void bark() { std::cout << "Dog " << name_ << " rules!" << std::endl; }
};
void foo() {
	std::shared_ptr<dog> p(new dog("run"));//count = 1;
	//2 steps: 1 dog run created, 2 p created// not exception safe
	std::cout << p.use_count() << std::endl;

	//delete p; 
	{
		std::shared_ptr<dog> p2 = p; //count=2
		p2->bark();
		std::cout << p.use_count()<<":"<< p2.use_count() << std::endl;

	}
	////count = 1;
	std::cout << p.use_count() << std::endl;

	p->bark();//p is dangling pointer -- undefined behaviour
			  ////count = 0;delete both
	std::cout<<p.use_count()<<std::endl;

}//memory leak
int main()
{
	foo();
	dog* d = new dog("t");
	// an object should be assigned to a smart pointer as soon as it be created, raw point should not be used
	std::shared_ptr<dog> p(d);	std::cout << p.use_count() << std::endl;// d is raw point count will be 1

	std::shared_ptr<dog> p2(d); 		std::cout << p.use_count() << ":" << p2.use_count() << std::endl;// d is raw point count will be 1 not change
	// p2 will delete d again
	//prevent problem to apply raw pointer to shared pointer
	std::shared_ptr<dog> p3 = std::make_shared<dog>("t");//faster and safer even better thans	std::shared_ptr<dog> p(new dog("run"));//count = 1;
	// std::make_shared function created shared pointer in one step
	p3->bark();
	(*p).bark();
	//static_pointer_cast for shared pointer = static_cast for raw pointer
	//dynamic_pointer_cast for shared pointer = dynamic_cast for raw pointer
	//const_pointer_cast for shared pointer = const_cast for raw pointer
	std::shared_ptr<dog> p4 = std::make_shared<dog>("t1");
	std::shared_ptr<dog> p5 = std::make_shared<dog>("t2");
	p4 = p5;//t1 will be deleted
	p4 = nullptr;//t1 will be deleted
	p4.reset();//t1 will be deleted
	std::shared_ptr<dog> p6 = std::make_shared<dog>("t3");//using default deleter: operator delete
	std::shared_ptr<dog> p7 = std::shared_ptr<dog>(new dog("t4"),[](dog*p) {std::cout << "custom deleting. "; delete p; });
	// try using customer deleter, shared_ptr is only choice
	std::shared_ptr<dog>p8(new dog[3]);//only count first dog[0] in array, other two dog,dog[1]dog[2] will be leaked
	std::shared_ptr<dog> p9 = std::shared_ptr<dog>(new dog("t4"), [](dog*p) {std::cout << "custom deleting. "; delete []p; });
	//customized array deleter delete dog[] array  all three dogs will be deleted dog[3]deleted
	p6.get();//return raw pointer
	dog* p10 = p6.get();
	//delete p10; // delete t4 dog but shared_ptr p6 will delete t4 again -- undefined behaviour
	std::shared_ptr<dog>p11(d);
	//doghouse.savedo(d);//not save d because when p6 deleted, d will be nullptr

	return 0;
}
/*++++++++++++++++++ 7. C++ 11 library: wake pointer - 1 ++++++++++++++++++++ 
#include<memory>
class dog {
	//std::shared_ptr<dog> m_friend;//cyclick reference create memery leak non objects will be deleted
	//solution : use weak_ptr for m_friend 
	// weak_ptr only access object not own object means others has not right to call to delete the object
	// weak_ptr close to raw pointer and provide protection to not call delete delete the object
	// weak_ptr create protection on object that no one can delete object
	// weak_ptr provide save access to object, the object weak_ptr pointing to is deleted then weak_ptr will point to nullptr
	std::weak_ptr<dog>m_friend;
public:
	std::string name_;
	dog(std::string name) {
		std::cout << "dog " << name << " is now created" << std::endl;
		name_ = name;
	}
	dog() {
		std::cout << "namless dog  is now created" << std::endl;
		name_ = "nameless";
	}
	~dog() {
		std::cout << "dog " << name_ << " is now destoried" << std::endl;
	}
	void bark() { std::cout << "Dog " << name_ << " rules!" << std::endl; }
	void makeFriend(std::shared_ptr<dog> f){ m_friend = f; }
	void showFriend() { 
		//std::cout << m_friend->name_ << std::endl; //weak_ptr cannot be used as regular ptr
		if(!m_friend.expired()) //if weak_ptr is empty pointer, lock() will throw exception
		std::cout << m_friend.lock()->name_ << std::endl;//lock()  check weak_ptr if point to valid object and make sure when access this object it is not been deleted

		//weak_ptr use_count() provide the number of pointers pointing to object
		std::cout << m_friend.lock()->name_<<" is owned by "<< m_friend.use_count()<<" pointers" << std::endl;
	}
};
int main()
{
	std::shared_ptr<dog> p0(new dog("run"));//count = 1;

	std::shared_ptr<dog> p1(new dog("work"));//count = 1;
	// shared pointers points to each other two dogs wont be deleted it creates memory leak
	p0->makeFriend(p1);
	p1->makeFriend(p0);//
	p0->showFriend();
	return 0;
}*/
/*++++++++++++++++++ 8. C++ 11 library: unique pointer - 1 ++++++++++++++++++++
//unique pointer is lightweight smart pointer
// origin object will be deleted when unique pointer lose ownership or change the ownership
#include<memory>
class bone {};
class dog {
	bone*pb;
	std::unique_ptr<bone> pbb;
public:
	std::string name_;
	dog(std::string name) {
		std::cout << "dog " << name << " is now created" << std::endl;
		name_ = name;
	}
	dog() {
		pb = new bone;
		//after bone create, then exception happen, the dog not created but bone will not be destoryed then create leak use unique_ptr to solve the problem

		pbb = std::make_unique<bone>(new bone);
		//if dog not created successfully, pbb will be destoryed
		std::cout << "namless dog  is now created" << std::endl;
		name_ = "nameless";
	}
	~dog() {
		delete pb;
		std::cout << "dog " << name_ << " is now destoried" << std::endl;
	}
	void bark() { std::cout << "Dog " << name_ << " rules!" << std::endl; }
	
};
void f(std::unique_ptr<dog> f) {
	f->bark();
	if (!f) {
		std::cout << "f empyt";
	}
	else std::cout << "f not empty";
}
std::unique_ptr<dog> getDog() {
	std::unique_ptr<dog>p(new dog("sdf"));
	return p;//return by value, std::move() automatic apply, p will be destoried// use unique_ptr to solve the problem
}
void test() {
	std::unique_ptr<dog> fd(new dog("rudn"));
	f(std::move(fd));// use std::move() to transform ownership of object of unique_ptr
	std::unique_ptr<dog> sd = getDog();
	std::unique_ptr<dog[]> sd1(new dog[3]);// auto delete all elements array, different from shared_ptr //template of unique_ptr is array
}

int main()
{
	dog*p = new dog("arun");
	p->bark();
	std::unique_ptr<dog>ps ( new dog("run")); //dog run cannot be shared when apply to unique ptr ps already
	ps->bark();
	delete p;
	ps.reset(new dog("walk"));
	//ps.release();//not destory object but return raw pointer to object should not be called before decide not use unique pointer any more, release() make ps give up ownership of dog walk
	if (!ps) {
		std::cout << "ps is empty. \n";
	}
	else {
		std::cout << "ps is not empty. \n";

	}
	std::unique_ptr<dog>p1(new dog("aa"));
	std::unique_ptr<dog>p2(new dog("bb"));
	p2->bark();
	p2 = std::move(p1);//move p1 to p2 1. aa desotry ,2. p1 is empty  3 p2 = aa
	p2->bark();
	test();
	return 0;
}*/
/*++++++++++++++++++ 9. C++ 11 library: resource management ++++++++++++++++++++ 
#include<memory>

class person {
	//std::string* pname_;
	//std::shared_ptr<std::string>pname_;
	std::unique_ptr<std::string>pname_;
public:
	person(std::string name) :pname_(new std::string(name)) {}
	//person(const person& p) :pname_(new std::string(*p.pname_)) {}
	//person(const person&) = delete;
	//person & operator=(const person& p)  {}
	person(person&&) = default;//because destructor is defined so have to define  move constructor to bring move constructor back, chekcout rules about auto generated class functions

	~person() { //delete pname_;
	}
	void printName() { std::cout << *pname_; }
};
int main()
{
	std::vector<person> persons;
	//persons.push_back(person("dsf"));
	//persons.emplace_back("asdfsdafsadf");//emplace_back function take same parameter passed into constructor
	persons.push_back(std::move(person("dsf")));
	persons.front().printName();//access pname which is already deleted
								//c++ 03 solution
								//1. define copy constructor and copy assignment operator
								//2. delete copy constructor and copy assignment operator
	std::cout << "Goodbye" << std::endl;
	return 0;
}*/
/*++++++++++++++++++ 10. C++ 11 library: regular expression ++++++++++++++++++++ 
#include <regex>
using namespace std;
int main()
{
	//=================regular expression gramma===================
	// default: ECMAScript
	// basic
	// extended
	// awk
	// grep
	// egrep
	//============================================================
	//string str;
	//while (true) {
	//	cin >> str;
	//	regex e("abc.",regex_constants::icase);//1. icase ignore case  2. "." any string start with abc length is 4 except new line 3.
	//	regex e("abc?");//"? " means zero or 1 preceding characters
	//	regex e("abc*");//"*" means zero or 1 or more preceding characters
	//	regex e("abc+");//"+" means 1 of more preceding characters
	//	regex e("ab[cdef]+");//"+" means 1 or more preceding characters
	//	regex e("ab[cdef]*");//"+" means 1 or more preceding characters
	//	regex e("ab[^cdef]*"); // "^" means oppsite
	//	regex e("ab[cdef]{3}");//{3} match 3 preceding characters
	//	regex e("ab[cdef]{3,}");//{3,} match 3 or more preceding characters
	//	regex e("ab[cdef]{3,5}");//{3, 5} match 3, 4, 5  preceding characters
	//	regex e("abc|de[cdef]");//"|" means or, either match abc or de[cdef]
	//	regex e("abc|de[\]cdef]");//"\"escape sign, to match "]" and cdef, treat "]" as one character
    // ==========================regular expression submatches====================================
	//	regex e("(abc)de+\\1");// \1 means Fist group appears after (abc)de  ()is subgroup submatch
	//	regex e("(abc)de(fg+)\\2\\1");// \1 means Fist group appears after (abc)de  ()is subgroup submatch
	//	regex e("[[:W:]]+@[[:W:]]+\.com");//match email address, [[:W:]]means a word character includes digit, number, or underscore, "+" is one or more 
	//	bool match = regex_match(str, e);// match regular expression with string
	//	bool match = regex_search(str, e);// search string see if it contains any match the regular expression
	//	regex e("^abc.", regex_constants::icase);//"^" means begining of string, so it search only if begining is match
	//	regex e("abc.$", regex_constants::icase);//"$" means end of string, so it search only if end is match, 
	//	regex e("^abc.+", regex_constants::grep);// run regex with grep script, ECMAScript is default ones
	//	bool match = regex_search(str, e);

		//std::smatch m;// smatch is object sotre result of string match
		//regex e("([[:W:]]+)@([[:W:]]+)\.com");// match subgroup pattern of email address, () creates groups

		//bool found = regex_search(str, m, e);// it match string with e and store result in m
		//cout << "m.size() "<< m.size() << endl;
		//for (int n = 0; n < m.size(); n++) {  //m.size() return number of matched result stored in M ,  [0]entire match [1]submatch group 1 [2]submatch group 2
		//	cout << "m[" << n << "]:str()=" << m[n].str() << endl;  // 3 ways to retrive results
		//	cout << "m[" << n << "]:str()=" << m.str(n) << endl;
		//	cout << "m[" << n << "]:str()=" << *(m.begin()+n) << endl;

		//}

		//cout << "m.prefix().str(): " << m.prefix().str() << endl;//everyting before matched string
	 
		//cout << "m.sufix().str(): " << m.suffix().str() << endl;//everyting after matched string

		//cout << (match ? "matched" : "not matched") << endl << endl;

	//}
	// ==========================regular expression iterators===========================
    // ************************** regex_iterator*******************************
	//string str = "boq@gmail.com;  bdsoq@gmail.com;;   bddssoq@gxxmail.com";
	//regex e("([[:w:]]+)@([[:w:]]+)\.com");
	//smatch m;
	//only display first match not continue iterator
	//bool found = regex_search(str, m, e);
	//cout << (found ? "matched" : "not matched") << endl << endl;
	//for (int n = 0; n < m.size();n++) {
	//	cout << "m[" << n << "]:str()" << m[n].str() << endl;
	//}
	//apply iterator match to search whole string
	//sregex_iterator pos(str.cbegin(), str.cend(), e);
	//sregex_iterator end; //default constructor defines past-the-end iterator
	//for (pos; pos != end; pos++) {
	//	cout << "matched: " <<pos->str(0) << endl;
	//	cout << "user name: " << pos->str(1) << endl;
	//	cout << "Domain: " << pos->str(2) << endl;
	//	cout << endl;

	//}
	// ************************** regex_token_iterator*******************************
	// point to submatch
	//apply token iterator match to search whole string
	//sregex_token_iterator posq(str.cbegin(), str.cend(), e, 1);//"0" parameter indicated how string matches going to be abstracted, default is 0 which return whole match, -1 is return not matched subgroup, 1 is first match subgroup, 
	//sregex_token_iterator endq; //default constructor defines past-the-end iterator
	//for (; posq != endq; posq++) {
	//	cout << "matched: " << posq->str() << endl;
	//	cout << endl;

	//}
	string str = "boq@gmail.com;  bdsoq@gmail.com;;   bddssoq@gxxmail.com";
	regex e("([[:w:]]+)@([[:w:]]+)\.com", regex_constants::icase);//regex_replace compitable with refex's regex_constants
	cout << regex_replace(str, e, "$1 is on $2", regex_constants::format_no_copy| regex_constants::format_first_only);// repace string with pattern first group is on second group   "format_no_copy" means not matched parts will not be copied to new string  "format_first_only" means only copy first match
	
																													  //cout << str << endl;

	//cin >> str;
	return 0;
}*/
/*++++++++++++++++++ 11. C++ 11 library: clocks and timer ++++++++++++++++++++
//********chrono: a precision neural library for time and date
// Clockes:
// 1 system clock: std::chrono::system_clock: current time of system - not steady, canbe modified by system user
// 2 steady_clock: std::chrono::steady_clock: goes at a uniform rate
// 3 high_resolution_clock; std::chono::high_resolution_clock: provides smallest posible tick period
// std::chrono::duration<> represents time duration => 2 hours ( a number and a unit )
// duration<int, ratil<1,1>> //number of seconds stored in int
// duration<double, ratio<60,1>>//number of minutes stored in a double :: nanoseconds, microseconds, milliseconds,seconds, minutes, hours
// system_clock::duration  -- duration<T, system_clock::period>
// Time_point:
// std::chrono::time_point<>: represents a point of time => 00:00 january 1, 1970(corordinated universal time - utc) -- epoch of a clock
// time_point<system_clock, millisconds>: return timepoint based on system clock and unit is milliseconds
// system_clock::timepoint -- time_point<system_clock, system_clock::duration>
// steady_clock::timepoint -- time_point<steady_clock, steady_clock::duration>

#include <chrono>
using namespace std;
int main()
{
	std::ratio<1, 10>r;// 1/10  
	cout << r.num << "/" << r.den << endl;//<2,10> => 1/5
	//all clock::period represent ratio
	cout << chrono::system_clock::period::num << "/" << chrono::system_clock::period::den << endl;
	chrono::microseconds mi(2700);
	chrono::nanoseconds na=mi;
	chrono::milliseconds mill=chrono::duration_cast<chrono::milliseconds>(mi);// 2 milliseconds  //from lower resolution to high resolution not need cast, but high resolution to lower resolution need cast
	mi = mill + mi;//2000+2700=4700  not need cast
	mi.count();//return 2700
	na.count();//return 2700000
	chrono::system_clock::time_point tp = chrono::system_clock::now();//current time of system clock
	cout << tp.time_since_epoch().count() << endl;
	tp = tp + chrono::seconds(2);//add 2 seconds to current time point
	cout << tp.time_since_epoch().count() << endl;
	chrono::steady_clock::time_point start = chrono::steady_clock::now();
	cout << "i am bored" << endl;
	chrono::steady_clock::time_point end = chrono::steady_clock::now();
	chrono::steady_clock::duration d = end-start;
	if (d == chrono::steady_clock::duration::zero()) cout << "no time elapsed" << endl;
		cout << chrono::duration_cast<chrono::microseconds>(d).count() << endl;;
	return 0;
}*/
/*++++++++++++++++++ 12. C++ 11 library: Random number engine ++++++++++++++++++++ 
// random engine: stateful generator that generates random values within predefined min and max, not truely random -- pseudorandom
// c++ provide 16 random engines
#include<chrono>
#include<random>
#include<sstream>
#include<algorithm>
using namespace std;
void pringRandom(std::default_random_engine e) {
	for (int i = 0; i < 10; i++)
		cout << e() << " ";
	cout << endl;
}
int main()
{
	std::default_random_engine eng;	std::default_random_engine eng1;
	pringRandom(eng);
	pringRandom(eng1);
	cout << "==================================================" << endl;

	cout << "MIN: " << eng.min() << endl;
	cout << "MAX: " << eng.max() << endl;
	std::stringstream state;
	state << eng;  //save current state
	cout << eng() << endl;
	cout << eng() << endl;
	state >> eng;  //restore current state
	cout << eng() << endl;
	cout << eng() << endl;
	cout << "==================================================" << endl;

	unsigned seed = std::chrono::steady_clock::now().time_since_epoch().count();
	std::default_random_engine eng3(seed);
	pringRandom(eng3);
	eng3.seed();//reset engine e to initial state
	eng3.seed(109);//set engine eng3 to state according to seed 109
	eng1.seed(109);
	if (eng3 == eng1) cout << "eng3 and eng1 have the same state" << endl;
	vector<int>d{ 1,2,3,4,5,6,7,8,9 };
	std::shuffle(d.begin(),d.end(), std::default_random_engine() );//std::default_random_engine() default random engine()

	return 0;
}*/
/*++++++++++++++++++ 12. C++ 11 library: Random number distribution ++++++++++++++++++++
// c++ provide teens different distribution algorithms
#include<chrono>
#include<random>
using namespace std;
int main()
{
	unsigned seed = std::chrono::steady_clock::now().time_since_epoch().count();
	std::default_random_engine e(seed);
	cout << e() << endl;//rnage:[e.min(),e.max()]
	// range:[0.5]
	cout << e() % 6 <<endl;
	// 1 bad quality of randomness
	// 2 can only provide uniform distribution, only evenly distribution, but not real distribution this is why use uniform_int_distribution and uniform_real_distribution 
	std::uniform_int_distribution<int> sitr(0, 5);//range:[0,5] generate interger random value (0 included, 5 included)
	cout << sitr(e) << endl;
	std::uniform_real_distribution<double> sitr1(0, 5);//range:[0,5) generate real random value (0 included, 5 not included)
	cout << sitr1(e) << endl;
	
	std::poisson_distribution<int> sitr2(1.0);//mean is 1.0, generate  random values mean is 1.0
	cout << sitr2(e) << endl;
	std::normal_distribution<double>distrN(10.0, 3.0);//mean and standard deviation
	vector<int> v(20);
	for (int i = 0; i < 800; i++) {
		int num = distrN(e);                          //convert double to int
		if (num >= 0 && num < 20) {
			v[num]++;                                 //e.g. v[10]records number of times 10 appeared
		}
	}
	for (int i = 0; i < 20; i++) {
		cout << i << ":" << v[i] <<":"<<string(v[i],'*') << endl;
	}
	return 0;
} */
/*++++++++++++++++++ 13. C++ 11 library: Tuple ++++++++++++++++++++ 
#include <tuple>
#include <map>
#include<unordered_map>
using namespace std;
tuple <string, int>getNameAge() {
	return make_tuple("dsf",3);
}
int main()
{
	//pair used to sotre two values
	std::pair<int, string>p = make_pair(23, "hello");
	cout << p.first << " " << p.second << endl;
	std::tuple<int, string, char>t(32, "penny wise", 'a');
	cout << get<0>(t) << endl;
	cout << get<1>(t) << endl;
	cout << get<2>(t) << endl;
	get<1>(t) = "adsfdsafd";
	cout << std::get<1>(t) << endl;
	string & s = get<1>(t);
	s = "patience is dsd";//change t
	cout << std::get<1>(t) << endl;
	//cout << std::get<3>(t) << endl;//out of range, not compiled
	vector<int> vec(3) ;
	vec[1] = 3;
	int i = 1;
	//std::get<i>(t);//i has to be const to pass into fucntion<const i>, not compiled
	tuple<int, string, char> t2;
	t2 = tuple<int, string, char>(12,"asdfdasf dfdsfds dsfdsf",'d');
	t2 = std::make_tuple(12, "asdfdasf dfdsfds dsfdsf", 'd');
	if (t > t2) { // lexicographicaol comparison
		//A lexicographical comparison is the kind of comparison generally used to sort words alphabetically in dictionaries; It involves comparing sequentially the elements that have the same position in both ranges against each other until one element is not equivalent to the other. The result of comparing these first non-matching elements is the result of the lexicographical comparison.
		cout << "t is larger than t2" << endl;
		t = t2;// member by member copying
	}
	//tuple can store references none stl container can store refernece
	string st = "in for a penny";
	tuple<string&>t3(std::ref(st));
	get<0>(t3) = "adfdsaf";
	t2 = std::make_tuple(12, "asdfzxcxzfdsf", 'd');
	int x;
	string y;
	char z;
	make_tuple(ref(x), ref(y), ref(z)) = t2;
	//x=12, y=asdfzxcxzfdsf z=d
	std::tie(x, y, z)=t2; //doing the same thing as make_tuple(ref(x), ref(y), ref(z)) 
	std::tie(x, std::ignore, z) = t2;//not apply y value, tie() can ignore element
	auto t4 = std::tuple_cat(t2, t3);// t4 is a tuple<int, string, char, string>  tuple_cat combine two tuples
	// tuple traits
	cout<<std::tuple_size<decltype(t4)>::value<<endl;//4
	std::tuple_element<1, decltype(t4)>::type d;// d is a string

	// ***************************** why use tuple *******************************
	struct Person { string name; int age; } p1;
	tuple<string, int>t0;
	cout << p1.name << " " << p1.age << endl;   // struct is more readable then tuple
	cout << get<0>(t0) << " " << get<1>(t0) << endl;
	// 1 as a one-time only structure to transfer a group of data, avoid to define dedicated structure
	string name; int age;
	std::tie(name, age) = getNameAge();
	// 2 comparison of tuples
	tuple<int, int, int>time1, time2;//hoours, minutes, seconds
	if (time1 > time2)cout << "time1 is a later time";
	// 3 create multi-index map
	std::map<tuple<int, char, float>, string>m;
	m[std::make_tuple(1,'f',0.1)]="sdfdsfdsf";
	std::unordered_map<tuple<int, char, float>, string>hashtable;
	int a, b, c;
	std::tie(b, c, a) = std::make_tuple(a,b,c);// rotate data  b=a, c=b, a=c
	return 0;
}*/
/*int main()
{
	return 0;
}*/

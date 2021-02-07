// advancedCppToturial.cpp : Defines the entry point for the console application.
//
#include "stdafx.h"
#include <string>
#include <vector>
#include <iostream>
#include <memory>
#include<mutex>
//#include "elevenDog.h"
//#include "elevenCat.h"

class Dog {
	std::string name;
	int age;
public:
	Dog() {
		age = 3; name = "dummy";
	}
	//******************************const parameters**************************************
	void setAge(int const &i) {
		age = i;
		//i++;//not compile require const reference value
	}
    void setAge(int &i) {
		age = i;
		i++;
	}
	//------------compiler cannot differentiate setAge1(int const i) && setAge1(int i)
	//void setAge1(int const i) {//this const function is useless because i is copy of value
	//	age = i;
		//i++;//not compile require const reference value
	//}
	void setAge1(int i) {
		age = i;
		i++;
	}
	//******************************const return values**************************************
	const std::string& getName() {return name;} //return const reference of name
	//const std::string getName() { return name; } // compiler cannot distinguish difference
	const std::string getNam1e() { return name; }//return const value of copy of name, so this function is useless
	//******************************const function*******************************************
	void printDogName()  const {//function will be called when dog instance is const
	  std::cout << name << "const" << std::endl; 
	  //std::cout << getName() << "const" << std::endl; //getName() is not CONST function not compile
	  //age++; //not compile need const variable inside const function 
	}
	void printDogName()  {//function will be called when dog instance is not const
		std::cout << getName() << "non-const" << std::endl;

	}

};
class bigArray {
	std::vector<int> v;
	mutable int accessCounter;
	int *v2;
public:
	int getItem(int index) const {
		//accessCounter++;//const function should no moldified value, except (accessCounter is mutable ||const_cast<bigArray*>(this->accessCounter))
		//const_cast<bigArray*>(this)->accessCounter++;
		return v[index];
	}
	int setV2Item(int index,int x) const {		//set is const function is accepted because add element in to array doesnt change memner of object
		*(v2 + index) = x;
		return *v2;
	}
	const int*const fun(const int *const &p)const {};
};
class dog {//equivalent to class dog {};
	//4 default generated functions:
		
public:
	//first:
		dog(const dog& copiedDog) {}; //member by member initialization
	//second:
		dog& operator=(const dog& copiedDog) {}; //member by menber coping  if member is const or refernece whcih is not be able to be copied, this function  will not be automatically generated
	//third:
		dog() {};//1. call base calss's default constructor; 2. call data member default constructor  if base class has not default constructor, this functtion will not be generated
	//forth:
		~dog() {};//1. call data member class's destructor; 2. call base class's destructor.  if base class destructor is private function it will not be able to be generated
};
/*1copy */
class dog2 {
public: 
	std::string m_name;
	dog2(std::string name = "Bob") { m_name = name; std::cout << name << " is born." <<std::endl; };
	~dog2() { std::cout << "dog " << m_name << " is destoried" << std::endl; };
};
class dog3 {
public:
	std::string &m_name;
	dog3(std::string name="bob"):m_name(name) {    std::cout << name << " is born." << std::endl; };

	~dog3() { std::cout << "dog " << m_name << " is destoried" << std::endl; };
};
class collar {
public:
	collar() {//compiler will not generate default constructor because already one constructor defined
		std::cout << "color default is born. " << std::endl;
	};
	collar(std::string color) {//compiler will not generate default constructor because already one constructor defined
		std::cout << "color " << color <<" is born. "<< std::endl;
	};
	~collar() {
	};
};
class dog4 {
public:
	std::string& m_name;//m_name is reference not initialized so it is not compile
	collar m_collar;
};
//C++ 11 update
class dog5 {
public:
	dog5() = default;
	dog5(std::string name) {};
};
class OpenFile {
public:
	OpenFile(std::string fileNae) {//define one constructor to disable default constructor		
		std::cout << "open file: " << fileNae << std::endl;
	};
	void destoryMe() { delete this; std::cout << "destory curssrent file" << std::endl; };
	//gf(OpenFile &f) { OpenFile f2(f); std::cout << "call private copy constructor to create a copy" << std::endl; };//copy constructor no body to be called by public function
	//OpenFile(OpenFile& rhs)=delete; //delete copy constructor, not allow other use open same file
private: 
	OpenFile(OpenFile& rhs);//define copy constructor as private fucntion to forbid use copy constructor
	OpenFile& operator=(const OpenFile& rhs);//
	void writeLine(std::string str);//disabled parent function
	~OpenFile() { std::cout << "destory current file" << std::endl; };//without body cannot be compiled, object need to be destoryed
};
class thesixDog {
public:
	//virtual
	 ~thesixDog() { std::cout << "thesixDog is destory" << std::endl; };
	virtual void bark() { std::cout << "thesixDog is barking" << std::endl; };
};
class yellowthesixDoge :public thesixDog {
public:
	~yellowthesixDoge() { 
		std::cout << "yellowthesixDoge is destory" << std::endl;
		std::cout << "parent virtual key word ALLow yellowDog inheritant function invoked " << std::endl;
	};
};
class sixDogFactory {
public:
	static thesixDog* createyellowthesixDoge() {
		std::cout << "create yellow dog on heap" << std::endl;
		return (new yellowthesixDoge()); };
	static std::shared_ptr<thesixDog> createYellowOneWithSharedPointer() {
		std::cout << "create a shared pointer yellow dog" << std::endl;
		std::cout << "//shared pointer allow yellow dog inheritant fucntion invoked without parent virtual key word" << std::endl;
		return std::shared_ptr<yellowthesixDoge>(new yellowthesixDoge());
	};
};
class seventhDog {
public: 
	std::string m_name;
	seventhDog(std::string name) { m_name = name; std::cout << name << "is born" << std::endl; };
	~seventhDog() { std::cout << m_name << "is destoried" << std::endl;	//throw 20;
	  //solution one add try catch inside destructor to catch exception instead throw exception out
		/*try {
		}
		catch (int e) {
		}
		catch (...) {
		}*/
	  //solution two move exception code into another fucntion
	};
	void prepareToDestory() {
		throw 20;
	}
	void bark() {
		std::cout << m_name << "is barking" << std::endl;
	};
};
class eightDog {
public:
	eightDog() { std::cout << "dog is born" << std::endl; bark(); };
	virtual void bark() { std::cout  << "dog is barking" << std::endl; };
	void seeCat() {
		std::cout << "dog is seeing a cat" << std::endl; bark();
	};
	~eightDog() { std::cout << "dog is destoried and " << std::endl; bark(); }
};
class EighthYellowDog:public eightDog {
public: 
	EighthYellowDog() { std::cout << "Yellow dog is born" << std::endl;	};
	void bark() { std::cout << "Yellow dog is barking" << std::endl; }
};
class nineCollar {};
class nineDog {
public:
	nineCollar* nc;
	/*
	solution 1: 
	nineDog& operator=(const nineDog& rhs) {
	if (this == &rhs)
	return *this;
	nineCollar *duplicate = nc;
	nc = new nineCollar(*rhs.nc);//if delete nc first and this line has exception, nc will point to nothing
	delete duplicate;//before delete local collar create duplicate for safety
	return *this;
	}
	*/
	
	/*
	solution 2:
	*/
	nineDog& operator=(const nineDog& rhs) {
		nc = new nineCollar(*rhs.nc);//if delete nc first and this line has exception, nc will point to nothing
		return *this;
	}
};  
/*#ifndef Mutex_t
#define Mutex_t
#endif
int MUTEX_INITIALIZER = "";
Mutex_t mu = MUTEX_INITIALIZER;
void functionA() {
	Mutex_lock(&mu);//exception happen this line, mutex will not be unlocked
	Mutex_unlock(&mu);
}
class Lock {
private:
	std::mutex * m_pm;
public: 
	explicit Lock(std::mutex* pm) { pm->lock(); m_pm = pm; };
	~Lock() { m_pm->unlock(); };
};
std::mutex  &mu;
void functionA() {
	Lock mylock(&mu);
}
int Tenfunction_A() {
	std::shared_ptr<eightDog> pd(new eightDog());
}
class TenTrick {};
void Tentrian(std::shared_ptr<eightDog>ed, TenTrick tr) ;
TenTrick getTrick();
class lock1 {
private:
	std::shared_ptr<std::mutex> pdf;
public:
	explicit lock1(std::mutex* ph2) : pdf(ph2, ph2->unlock) {//after copy constructor duplicate second object, both shared pointer destory, mutex will be unlocked
		ph2->lock();
		//the second parameter of shared_ptr constructor is "deleter" function.
	};
};


elevenDog d("gunner");
struct person_t {//struct for small passive object carry public data and has no or few basic member functions, normally used for data container
//default public:
	std::string name;
	unsigned age;
};
class person {//class for bigger active object carry private data and interfaced through public member functions, normally used for complex data structure
//default private:
	std::string name_;
	unsigned age_;
public:
	unsigned age() const{ return age_; }; //gettter / accessor
	void set_age(unsigned a) { age_ = a; }; //setter / mutator
};*/
class Dog13 {
public:
	//Dog13() {
	//	std::cout << "Dog13 has born" << std::endl;
	//};
	virtual Dog13* clone() {//co-variant return type-> return type change based on requirement which is advantage of virtual inheritance
		return new Dog13(*this);
	}
};
class YellowDog13 :public Dog13 {
public:
	//YellowDog13() {
	//	std::cout << "YellowDog13 has born" << std::endl;
	//};
	virtual YellowDog13* clone() {
		return new YellowDog13(*this);
	}
};
void foo(Dog13* d) {
	Dog13* c;
	c=d->clone();

}
void f(int w) { std::cout << "f print: " << w << std::endl; };
// implicit user define type conversion inside class through two type methods:
//method1: use constructor with one parameter convert type of object into your class
//method2: use type conversion function convert object of your class into other types
class dog14{
public:
	dog14() {};
	virtual ~dog14() {};
	dog14(std::string name) { m_name = name; }
	std::string getName() { 
		std::cout << "get name function is called with name"<< m_name << std::endl;
		return m_name; }
	virtual void bark() { };
	//define type conversion function
	//virtual operator std::string() const {
	//	return m_name;
	//}
private:
	std::string m_name;
};
class YellowDog14:public dog14 {
public:
	YellowDog14() {};
	void bark() { std::cout << "woof. " <<age<< std::endl; };
	//virtual operator std::string() const {
	//	return m_name;
	//}
private:
	std::string m_name;
	int age;
};
class Rational14 {
public:
	Rational14(int numerator = 0, int denominator = 1) :num(numerator), den(denominator) {}
	int num; int den;
	////const Rational14 operator*(const Rational14& rhs) {
	//	return Rational14(num*rhs.num, den*rhs.den);
	//}
	//operator int() const {
	////	return num/den;
	//}
};
class dog17 {
public:
	std::string m_name;
	dog17():m_name("bob") {};
	void bark() const {// const mean *this is const the current scope
		std::cout << "dog " << m_name << " is barking" << std::endl;
		const_cast<dog17*>(this)->m_name="henry";
		//m_name = "henry";//error out
	}
};
const Rational14 operator*(const Rational14 & lhs, const Rational14& rhs) {
	return  Rational14(lhs.num*rhs.num, lhs.den*rhs.den);
}
// tutorial 18
  class B {
  public:
	  void pub_fun() {
		  std::cout << "this is public function" << std::endl;
	  }
  protected:
	  void pro_fun() {
		  std::cout << "this is protected function" << std::endl;
	  }
  private:
	  void pri_fun() {
		  std::cout << "this is private function" << std::endl;
	  }
  };// specify different access control form drived class to the base class
  class D_priv :private B {
  public:
	  void f() {
		 // pub_fun();//inherit as D_priv private fucntion
		  //pro_fun();//inherit as D_priv private fucntion
		 // pri_fun(); cannot access and inherit base class private fucntion
	  }
  };   //None of derived classes can access anything that is private in B
  class D_prot :protected B {
  public:
	//  using B::pub_fun;//to bring based class public function inside as public function
	  void f() {
		 // pub_fun();//inherit as D_priv protected fucntion
		 // pro_fun();//inherit as D_priv protected fucntion
		  // pri_fun(); cannot access and inherit base class private fucntion
	  }
  }; //D_pub inherits public members of B as public and the protected members of B as protected
  class D_pub :public B {
  public:
	  void f() {
		  //pub_fun();//inherit as D_priv public fucntion
		 // pro_fun();//inherit as D_priv protected fucntion
		  // pri_fun(); cannot access and inherit base class private fucntion
	  }
  };     //D_priv inherits the public and protected members of B as private
                              //D_prot inherits the public and protected members of B as protected
  //anyone can cast D_pub* to B*, D_pub is special type of B
  // D_priv's members and friends can cast a D_priv* to B*
  //D_prt's members, friends and children can cast a D_prot* to B*
  //private inheritance: similar to has-a relation
  class ring {
  public:
	  virtual void termble();

	  void tinkle() {
		  termble();
	  }
  };
  // COMPOSITION
  class dog1x {
	  ring m_ring;
	  ring m_ring2;//with comoposition easier to bring in another ring but private inheritance it is impossible
  public:
	  void tinkle() {
		  m_ring.tinkle();//call forwarding
	  }
  };
  //replace composition with private inheritance
  //private inheritance can access ring's protected members, but using composition cannot access ring's protected members
  //composition structure is preferred, composition is better Object oritantd, composiiotnn is more flexible
  class dog2x : private ring {
  public:
	  virtual void tremble();//try override fucntion private inheritance is better than composition

	  using ring :: tinkle; 
  };
  //19th public inheritance => is a relation Derived should be able to do anything base class can do
  class bird {
  public:
	  //void fly();
	  void bark(int age) { std::cout << "agge:" << age << std::endl; };
	  virtual void bark(std::string msg=" just a") {//virtual fucntion is bond in run time but default msg is bind during compile time so default is sill 'just a' not 'a yellow'
		  std::cout << "I am " << msg << "a bird" << std::endl;
	  }
  };
  class flyableBird :public bird {
  public:
	  using bird::bark;
	  void fly() {};
	  virtual void bark(std::string msg = " a yellow") {//virtual fucntion is bond in run time but default msg is bind during compile time so default is sill 'just a' not 'a yellow'
		  std::cout << "I am a "<<msg<<" fly bird" << std::endl;
	  }
  };
  class penguin :public bird{
	  
  };
  //20th lvalue and rvalue
  int square(int &x) {
	  return x*x;
  }
  int  constSquare(int const &x) {
	  return x*x;
  }
  int myglobal;

  int& fool1() {
	  return myglobal;
  }
  int sum(int i, int j) {
	  return i + j;
  }
  //21th polymophism
  //dynamic polymophism ---a little bit more expensive->1 run time cost of dynamic binding 2 memory cost of writing virtual binding
                      //---small cost may become critical when environment not allow
  //characters: create is-a relationship, parent write interface, child customise interface
  struct TreeNode { TreeNode *left, *right; };
  class Generic_Parser {
  public:
	  void parse_preorder(TreeNode * node) {
		  if (node) {
			  process_node(node);
			  parse_preorder(node->left);
			  parse_preorder(node->right);
		  }
	  }
  private:
	  void process_node(TreeNode* node) { }
  };
  class EmployeeChart_parser :public Generic_Parser {
  private:
	  void process_node(TreeNode* node) { 
		  std::cout << "Customized process_node() for EmployeeChart.; \n";
	  }
  };
  //static polymophism -> 
  template <typename T> class Generic_Parser_t {
  public:
	  void parse_preorder(TreeNode * node) {
		  if (node) {
			  process_node(node);
			  parse_preorder(node->left);
			  parse_preorder(node->right);
		  }
	  }
  private:
	  void process_node(TreeNode* node) { //it is not virtual function, will call base class process_node fucntion but will convert to current direved class type and class derived class process_node function
		  static_cast<T*>(this)->process_node(node);// this is static polymophism
	  }
  };
  class EmployeeChart_parser_t :public Generic_Parser_t<EmployeeChart_parser_t> {
	  // Generic_Parser_t<EmployeeChart_parser_t> &&  Generic_Parser_t<MilitaryChart_parser> are two different classes occupies their own space in programm images
  private:
	  void process_node(TreeNode* node) {
		  std::cout << "Customized process_node() for EmployeeChart.; \n";
	  }
  };
  // generalized static polymophism
  /*T Max(std::vector<T>v) {
	  T max = v[0];
	  for (typename std::vector<T>::iterator it = v.begin(); it != v.end();++it) {
		  if (*it>max) {
			  max = *it;
		  }
	  }
	  return max;
  }*/

  // toturial 22
  //***************************************88multiple inheritance
  class outputfile {//c++ rule: before compiler check the accessbility of function(public? private? protected?), it must find the best match fucntion
  public:
	  void write() {};
	  void open() {};
  };
  class inputfile {
  public:
	  void read() {};
  private:
	  void open() {};
  };
  class iofile : public outputfile, public inputfile {

  };
  //***************************************virtual inheritance

  class file {
  public:
	  std::string name;
	  file(std::string fname) {}
	  void open() {};
  };
  class outputfile2:virtual public file {//c++ rule: before compiler check the accessbility of function(public? private? protected?), it must find the best match fucntion
  public:
	  outputfile2(std::string fname) :file(fname) {}
	  void write() {};
  };
  class inputfile2 :virtual public file {//virtual inheritance make outputfile2 and inputfile2 inheritance same one base class
  public:
	  inputfile2(std::string fname) :file(fname) {}
	  void read() {};
  };
  class iofile2 : public outputfile2, public inputfile2 {//most direved class has responsbility to init base class
	  //diamond shape problem
	  iofile2(std::string fname) :outputfile2(fname), inputfile2(fname),file(fname) {}
  };
  //***************************************abstract class
    //abstract class: a class contain one or more pure virtual functions
    //pure abstract classes: A class contain only pure virtual functions -no data || -no concrete functions
    //problem for initialization and mulitple inhertance is fixed
  class outputfile3{
  public:
	 virtual void write() = 0;
	 virtual void open() = 0;
  };
  class inputfile3 {
  public:
	  virtual void read() = 0;
	  virtual void open() = 0;
  };

  //toturial 23
  //no pure abstract class provide interface and default implementation
  class dog23 {
  public:
	  virtual void bark() = 0;
	  void run() { std::cout << "I am running"; }
	  virtual void eat() {
		  std::cout << "dog eat shit..........";
	  }
  protected:
	  void sleep() {
		  std::cout << "i am sleeping,zn";
	  }
  };
  class reddog34:public dog23{
  public:
	  virtual  void barks() { std::cout << "I am a red23 dog . \n"; }
	  void isleep() { sleep(); }
  };

  //toturial 24
  //inheritance
  class dog24 {

  };
  class bulldog : public dog24 {

  };
  class shepherdog : public dog24 {

  };
  //composition
  //1. less code coupling then inheritance
  //2. child can access parent's protected members, inheritance breaks encapsulation, composition control accessbility
  //3. dyamic binding. a. inheritance is bound at compile time  b. composition can be bound either run time and compile time, 
  //4. flexiable code contract
  class activate_managerS {
  };

  class bulldog24 :public dog24{
	  activate_managerS *m = new activate_managerS();
  };
  class shepherdog24 :public dog24 {
	  activate_managerS *m = new activate_managerS();

  };
  // tutorial 25
  using std::cout;
  class B25 {
  public:
	  void f(int a) {};
  };
  class D25 :private B25 {
  public:
	  void g() {
		  using namespace std;// case 1 local scope
		  cout << "From D: \n";
	  }
	  void h() {
		  using std::cout;
		  cout << "From D: \n";//case 2.a local scope
	  }
	  using B25::f;//class 2.b class scope
	  //using namespace std;//illegal when using namespace std directivei in class scope
	  //using std::cout;//illegal when using std::cout in class scope
  };
  class E25 :public B25 {
  public:
	  void f();
	  using B25::f;
  };
  //Anonymous Namespace
  static void h() { std::cout << "out h()\n"; };
  void g();
  namespace {
	  void g() {};
	  void h() { std::cout << "inside h()\n"; g(); };//call local not global };
  }
 //toturial 26 koenig lookup
namespace A26 {
	struct X {};
	void g1(X) { std::cout << "calling A::g()1 \n"; };
}
//void g1(X) { std::cout << "calling A::g()1 \n"; }; cannot defined two fucntion same name when there are one in namespace and gloable scope
class c26 {
public:
	struct Y {};
	static void h(Y) { std::cout << "calling c::h()\n"; };
};
namespace A26 {
	struct X26 {};
	void g(X26) { std::cout << "calling A26::g()\n"; };
}
class B26 {
	void g(A26::X26) { std::cout << "calling B26::g()\n"; };
};
namespace C26{
	//void g(A26::X26) { std::cout << "calling c26::g()\n"; };
	void j() {
		A26::X26 x;
		g(x);//because keonig lookup both g() inside namespace C26 and A26 can be seen, it will cause conflict
	}
}
class D26:public B26 {
public:
	void g(A26::X26) { std::cout << "calling c26::g()\n"; };
	void j() {
		A26::X26 x;
		g(x);//because keonig lookup both g() inside namespace C26 and A26 can be seen, it will cause conflict
	}
};
//name hiding: namespace example
namespace E26 {
	struct X {};
	void gE26(int) { std::cout << "call e26 g()\n"; };
	void gE261(X) { std::cout << "call e26 g()\n"; };
	namespace F26 {
		void gE26() { std::cout << "call F26 g()\n"; };
		void gE261() { std::cout << "call e26 g()\n"; };
		void J() {
			//gE26(8);//it look current scope first and find definition, it will stop search
			using E26::gE26;
			gE26(8);
			X x;
			gE261(x);//keonig lookup tell compiler look ge261() in scope which X is defined
		}
	}
}
// tutorial 27
namespace A27 {
	struct X27 {};
	void g27(X27) { std::cout << " calling A27::g27() \n"; };
	//void g27() { std::cout << " calling A27::g27() not parameter \n"; };
	class C27 {
	public:
		void f271() {};
		void g217() {};
	};
	void h27(C27) {};
	std::ostream& operator<<(std::ostream&, const C27&);
}
namespace G27 {
	class H27 {};
	int operator+(A27::C27, int n) { return n + 1; };// gloable +oeprator hard to be find, this namesapce + operator can be find


}
int operator+(G27::H27, int n) { return n + 1; };//gloable +oeprator may not be find
namespace std {
	template <class InputIterator, class T> T accumulate(InputIterator first, InputIterator last, T init) {
		while (first != last)
			init = init + *first++;// it is hard to find global operator + () function
		return init;
	}
}
//tutorial 28
//new handler is function invoked when operator new failed to allocate memory 
// set_new_handler()  install a new handler and returns current new handler
void * operator new(std::size_t size)throw(std::bad_alloc) {
	while (true) {
		void * pMem = malloc(size);
		if (pMem)
			return pMem;//allocate memory succeed
		std::new_handler Handler = std::set_new_handler(0);//not succeed
		std::set_new_handler(Handler);//to free more memory
		if (Handler)//be abled to allocate more memory
			(*Handler)();
		else//cannot allocate more meory
			throw std::bad_alloc();
	}
}
/*class dog28 {
public:
	static void* operator new(std::size_t size)throw(std::bad_alloc) {
	  //allocate dog of size memory
		if (size = sizeof(dog))
			 new dog28();
		else
			::operator new(size);
	}
	static void operator delete(void* pMemory)throw(std::bad_alloc) {
		//allocate dog of size memory
		std::cout << "bo is deleting a dog, \n";
		free(pMemory);
	}
	~dog28();
};
class yellowDog28 :public dog28 {
	int age;
	static void operator delete(void* pMemory)throw(std::bad_alloc) {
		//allocate dog of size memory
		std::cout << "bo is deleting a yellow dog, \n";
		free(pMemory);
	}
};*/
void NoMoreMem() {
	std::cerr << "unable to alloocate memory, bo" << std::endl;
	abort();
}
int main()
{
	/*{
		//first toturial c++ const
		const int i = 9;
		int j = 6;
		int* k = 0;
		k = &j;
		*k = 6;
		const int *p1 = &i;//1. const only to data not pointer, *p is const, p is not const //*p = 10;//not compile  //p++; //compile ----------> data is const, poiner is not const
		int* const p = &j;// p=&i not compile because p is not const &i is const; p++ not compile because address can not be modified; value of j canbe modified----------------> data is not const, poiner is const
		const int* const p3 = &j;
		int const *p4 = &i;//const on left of *, data is const||const is on rfight of *, point is const
		const_cast<int &>(i) = 6;// const to not const
								 //static_cast<const int&>(j) = 7; not compile, static_cast cast a (not const) to const
	}*/
	/*{
		//second toturial const and functions
		Dog littleDog;
		const Dog constDog;
		const int dogAge = 10;
		littleDog.setAge(dogAge);
		littleDog.setAge1(dogAge);
		std::cout << dogAge << std::endl;
		//const std::string& dogname = littleDog.getName();
		//std::cout << dogname << std::endl;
		//littleDog.printDogName();
		//constDog.printDogName();
	}*/
	/*{
		//third toturial logic constness and bitwise constness
		bigArray bigA;
		std::cout<<bigA.setV2Item(0,0)<<std::endl;
	//	std::cout<<bigA.getItem(0)<<std::endl;
	}*/
	/*{
	    //forth toturial compiler generated functions
		//dog d;//compiler generated functions
		//1 compiler generated function are public and inline and generated only if they are needed
		//1. copy constructor not used so it not generated
		//2. copy assignment operator is used so it is generated
		//3. default constructor is override so not generated
		//4. default destructor is override so not generated
		//dog2 d1("henry");
		//dog2 d2;
		//d2 = d1;
		//std::string a = "henry";
		//dog3 d3(a);
		//dog3 d4;
		//dog5 d5;
		//d4 = d3;// no copy assignment operator function generated because one class member &m_name is reference which is not copyable and  cannot used with standard library container because stl container required containee to be copy assignable
	} */
	/*{
		//fifth toturial disallow functions
		//Compiler silently writes 4 functions if they are not explicitly declared:
		//  1.  Copy constructor
		//  2.  Copy assignment operator
		//  3.  Destructor
		//  4.  Default constructor
		//OpenFile f(std::string("bo_file"));//cannot access destructor because it is private
		//OpenFile f2(std::string("aa"));//object start on stack, will be automatically destroyed
		OpenFile *f = new OpenFile(std::string("bo_file"));//with private destructor, object instance can only be started on heap not on stack, need to be called to be destoried
		f->destoryMe();
		//f2.gf(f);
		//OpenFile f2(f);
		//c++ 11 disallowing functions
			//f()=delete; //delete unwanted functions
		//c++ 03 disallowing fucntions
			//declare function to be private and not define it
			//private destructor need to stay out of stack
	}*/
	/*{
		//sixth toturial virtual destructor and smart destructor
	//	thesixDog* sdog = sixDogFactory::createyellowthesixDoge();
		std::shared_ptr<thesixDog> sdog1 = sixDogFactory::createYellowOneWithSharedPointer();
		//delete sdog;
		sdog1->bark();

	}*/
	/*{
		//seventh toturial exceptions in destructors
		try {
			seventhDog d1("henry");
			seventhDog d2("bob");
			d1.bark();
			d2.bark();
			d1.prepareToDestory();
			d2.prepareToDestory();
		}
		catch (int e) {
			std::cout << e << " is caught" << std::endl;//local variable will be destoried in try block before exception is caught
			                                            //d1, d2 will be destroy and throw two exception 20 in total, but only one will be caught
		}

	}*/
	/*{
		//eighth toturial virtual function in constructor or destructor
		EighthYellowDog eyd;
		//eyd.seeCat();
	}*/
	/*{
		//ninth toturial Handling self-assignment
		nineDog dog;
		dog = dog;

	}*/
	/*{
		//ten torurial resource acquisition is initialization
		//1. use objects to manage resources: memory, hardware device, network handle, etc
		//2. RAII: use shared_ptr for resource acquisition
		//WRONG:
		//CORRECT:
		std::shared_ptr<eightDog> hc(new eightDog());
		Tentrian(hc, getTrick());
		//what happens during passing parameters in Tentrain
		//1. create new eightDog();
		//2. getTrick();
		//3. construct shared_ptr(eightDog);
		//order is determined by compiler;
		//SO DONT COMBINE STORING OBJECT IN SHARED POINTER WITH OTHER STATEMENT
		//what happens when resource manage object is copied?
		Lock li(&mu);
		Lock l2(li);
		//solution 1:
		// prohibit copying
		//disallow compiler generated functions.
		//solution2
		//reference-count the underlying resource by using tr1::shared_ptr;
		//template <class other, class D>shared_ptr(other *, D delete);
		// the default value for D is "delete", E.G.:
		//std::tr1::shared_ptr<eightDog>pd(new eightDog());
    }*/
	/*{
	    //eleven toturial static initialization Fiasco
		d.bark();
    }*/
	/*{
	    // twelveth toturial struct vs class
		person_t pt;
		std::cout << pt.age << std::endl;
		person p;
		std::cout << p.age() << std::endl;
    }*/
	/*{
	    // thirteenth toturial virtual constructor and clone() function
		std::cout << "sdfdsssssssssssssssssssssssssssssssssssssssssssssssssssssssss" << std::endl;
		YellowDog13 d;
		foo(&d);
    }*/
	/*{
	    // Forteenth toturial Define implicit type conversion
		//1. implicit standard type conversion
		char c = 'A'; 
		int i = c; 
		char* pc = 0; 
		f(c);
		Dog13* d13 = new YellowDog13();
		std::string dogname = "bob";
		dog14 dog1 = dogname;
		std::string dog2 = dog1;
		//printf("My name is %.1s", dog1);
		//std::cout<< "pring dogname: " << dog << std::endl;
		//principle: implicit type conversion make interface easy to use hard to use incorrectly
		//guidline:
		   //1. avoid define seemingly unexpected conversion
		   //2. avoid define two-way implicit conversion
		Rational14 rq = 23;
	
		Rational14 rw = rq * 2;
		Rational14 r3 = 3 * rw;
		//	Rational14 rw = rq * 2;//stop work global define operator* has conflict with class defined operator *()//better approach is use local defined operator * as below
		
	}*/
	/*{
	    // Fifteenth toturial All castings considered
		  // explicit type conversion - casting
		  // 1. static_cast
		  int i = 9;
		  float f = static_cast<float>(i);// convert object from one type to another
		  dog14 d1 = static_cast<dog14>(std::string("bob"));//type conversion needs to be defined
		  dog14* d2 = static_cast<dog14*>(new YellowDog14());// convert pointer/refernece from one type to related type (inheritance cast)
		  //2. dynamic_cast 
		  //a. only for pointer or reference from one type to related type
		  //b.  run-time type check, if succeed, py==pd; if fail, py==0;
		  //c. it requires the 2 types to be polymorphic(has virtual function)
		  dog14*pd = new YellowDog14();//
		  YellowDog14 *ac = dynamic_cast<YellowDog14*>(pd);
		  //3. const_cast
		    // only work on pointer and reference
		    // only work on same type
		    // cast away constness of object
		    //being pointed to
		  const char* charstart = "hellow";           
		  char* modify = const_cast<char*>(charstart);
		  //4. reinterpret_cast
		    // only on pointer and reference
		    // reinterpret the bits of the object pointed to 
		    // the ultimate cast that can cast one pointer to any other type of pointer
		  long p = 51110980;
		  dog* dd = reinterpret_cast<dog*>(p);
		  // c-style casting:
		    // mixture of static_cast const_cast and reinterpreted_cast
		    // easier to identify in the code
		    // less usage error. c++ style provides: a. narrowly specified purpose of each cast | b. Run-time type check capability
		  short a = 2000;
		  int x = (int)a; //c-format cast 
		  int j = int(a); //function cast

		  //Eighteenth toturial type conversion part 2
		  //example of dynamic_cast:
		  dog14* px = new dog14(); 
		  YellowDog14 * py =dynamic_cast<YellowDog14*>(px);//polymophic is better becasue dynamic_cast has run type check, expensive  cost
		  YellowDog14 * pw = static_cast<YellowDog14*>(px);//static_cast more risk then dynamic cast
		  if(py)
			  py->bark();
		  if (pw)
			  pw->bark();
		  pw->bark();
		  std::cout << "py = " << py << std::endl;
		  std::cout << "px = " << px << std::endl;
		  std::cout << "pw = " << px << std::endl;
		  dog17 d17;
		  d17.bark();
    }*/
	/*{
	   // 18th toturial Inheritance - public, protected and private
	   //class B {};// specify different access control form drived class to the base class
	   //class D_priv :private B {};   //None of derived classes can access anything that is private in B
	   //class D_prot :protected B {}; //D_pub inherits public members of B as public and the protected members of B as protected
	   // class D_pub :public B {};     //D_priv inherits the public and protected members of B as private
	   //D_prot inherits the public and protected members of B as protected
	   //anyone can cast D_pub* to B*, D_pub is special type of B
	   // D_priv's members and friends can cast a D_priv* to B*
	   //D_prt's members, friends and children can cast a D_prot* to B*
	   //Only public inheritance indicate there is relationship between parent and child
	   D_priv priD; D_pub pubD; D_prot proD;
	   //priD.pub_fun(); inaccessable 
	   pubD.pub_fun();
	   proD.pub_fun();// inaccessable without using B::pub_fun
	   B* b = &pubD;
	   //b = proD;//error out because cannot cast protected inheritance to base
    }*/
	/*{
	   // 19th toturial Maintain is-a relation for public inheritance
	   penguin p;
	   flyableBird *fb=new flyableBird();
	   bird *b=fb;
	   fb->bark();
	   b->bark();
	   flyableBird fbx;
	   bird bx (fbx);
	   fbx.bark();
	   bx.bark();
	   //fb->bark(5); int parameter bark()not inheritance by flybird shadow by bark with string parameter, when compiler looking for bark fucntion inside flybird class find bark with string then stop search regardless parameter type
	   // but it can apply using bird::bark to bring all bark fucntions from bird to flybird
	   // p.fly();//penguin cannot fly
    }*/
	/*{
	   //toturial 20 understand r-vale and l-value
	   //lvaue - Any object that occupies some identifiable location in memory
	   //rvalue- Any object that is not a lvalue
	   //******************lvalue************************
	   int i;//i is lvalue

	   int* p = &i;//i address is identifiable
	   i = 2;//memory content is modified
	  // dog dl;
	  // dl = dog();//lvalue of user defined type(class) most variables in c++ are lvalues.
	   //******************rvalue************************
	   int x = 2;//2 is rvalue
	   x = i + 2;//x+2 is rvalue
	   //int*p = &(i + 2);//error, address is not identifiable
	   //i + 2 = 4;//Error
	   //2=i;//Error
	  // dog d1;
	  // d1 = dog();//dog() is rvalue of user defined type
	   //int p = sum(3 + 4);//sum(3 + 4) is rvalue
	   //Rvalues
	   //Lvalues
	   //***************reference (lvalue reference)****************
	   int j = 3;
	   int &c = j;//lvalue reference
	   //&c = 4;//right side must be a lvalue 
	   const int & d = 5; //if reference d is consttant type, then it canbe signed with rvalue 5
	   square(j);
	  // square(3);//Error - parameter has to be lvalue reference
	   constSquare(5);//if parameter is constant value, rvalue will be accepted
	   //********transform between Rvalue and Lvalue***************
	   int t = 1;//
	   int w = i + 2;//i is lvalue and used to create rvalue(i+2)
	    w = i;// lvalue i is implicitly transform into rvalue
	   //rvalue can be userd to create lvalue
	   int v[3];
	   *(v + 2) = 4;//v+2 is rvalue, dereference *(v+2) is lvalue can be assigned with 4
       //**********misconception 1: fucntion or operator always yields  rvalues*************
	   int g = 9;//9 is rvalue
	   int f = g + 3;//g+3 is rvalue
	   int h = sum(3, 4);//sum(4,4)is rvalue
	   fool1() = 50;// but mygloble fool1() returned is lvalue
	   //array[3] = 50;//operator[] almost always generates lvalues
	   //**********misconception 2: lvalues are modifiable*************
	   //c language: lvalue means "value suitable for left-hand-side of assignment"
	   const int c = 1;//c is lvalue
	   c = 2;//Error, c is not modifiable
	   //**********misconception 3: rvalue are not modifiable*************
	   
	  // t + 3 = 6;//Error
	  // sum(3, 4) = 7;//error
	  // it is not true for user defined type(class)
	   class dog;
	  // dog.bark() //bark() may change the state of dog object
	  //|||||||||||||||||||||||||||||||Summary|||||||||||||||||||||||||||||||||||||||
	   //1.  c++ expression yield either an rvalue or lvalue
	   //2. if the expression has an identifiable memory address, it's lvalue; otherwise, rvalue
	}*/
	/*{
	   // tutorial 21 static polymophism
	     // TMP: template metaprogramming -> move part of computation happens during run time to compile time to improve effeieicy
	   EmployeeChart_parser ep;
	   ep.parse_preorder(new TreeNode());
	 //  MilitaryChart_parser ep;
    }*/
	/*{
	   // Tutorial 22 Multiple inheritance
	   iofile pop;
	   //  f.open();//mulitiple definition of open(); error ambiguous access of 'open'
	   pop.outputfile::open();
	   iofile2 pop2;
	   pop2.open();//inputfile and outputfile both inheritance from file so call two open functions has conflict, then use virtual inheritance to tell complier to look for open in base file class to solve diamond inherance problem
	  // pop2.outputfile::name="file1";//virtual inherantance brake these two lines
	  // pop2.inputfile::name = "file2";
	  // interface segregation principle: split large interfaces to smaller and more specific ones so that clients only need to know about the methodsthat are of interest to them

    }*/
	/*{
	   // toturial 23 duality of public inheritance - inheritance of interface  - inheritance of implementation
	   //---------------------interface inheritance 1.subtyping 2.polymorphism
	   //virtual void bark()=0;
	   //pitfalls:
	   // - be careful of interface bloat
	   // - interface do not reveal implementation
	   //---------------------implementation inheritance - increase code complexity - not encouraged
	   //1 not use iheritance for code reuse, use composition
	   //2 minimize the implemenetation in base. base shoud be thin
	   //3 minimize the level of hierarchies in implemenetation inheritance
	}*/
	/*{
		// toturial 24 code reuse - inheritance vs composition 
	}*/
	/*{
	    // toturial 25 Namespace and keyword "using"
		//1 using directiveL bring all namespace members into current scope using namespace std;
		//2 using declaration
		//  a. Bring one specific namespace member to current scope
		//  b. Bring a member from base class to current class's scope
		//  example:
		using std::cout;
		cout << "hello world.\n";
		//using B25::f;//illegal when using 'using' in global scope 
		D25 d25;
		d25.f(8);
		E25 e35;
		//e35.f(8);//not compile, B f(int) is hide by E25 f()
		e35.f(8);//using B25::f to bring B25 f() to E25 scope
		h();
    }*/
	/*{
	    //koenig lookup-argument dependent lookup(ADL)
		A26::X x1;
		A26::g1(x1);
		g1(x1);//koenig search gloable scope current scope and scope where function defined which is inside namespace A26
		c26::Y y;
		c26::h(y);
		//h(y);//not compile, koenig lookup only apply namespace not inside class, h() will not be found
		D26 D26; D26.j();//ONLY g() not defined in class D26 then it will look into namespace, if g() defined in class D26 it will only look g() inside class D26
		//C26::j();//because keonig lookup both g() inside namespace C26 and A26 can be seen, it will cause conflict
        //member function from parent class has higher priority then any outside function

    }*/
	/*{
	    //tutorial 27 koenig lookup and namespace design
		A27::X27 x27;
		g27(x27);//search scope where A27 defined then it find g27()
		std::cout << "hi \n";// because of klookup write line like this
	//	std::cout std::<< "Hi.\n"; will not compile
		std::operator<<(std::cout, "Hi. \n");//or you have to write this line instead

		//Engineering principle:
		// 1. functions that operate on class C27 and in a same namespace with c are part of c's interface
		// 2. functions that are part of 's interface should be in the same namespace as c
		A27::C27 arr[4];
		std::accumulate(arr, arr+3, 0);//return 3
    }*/
	/*{
	    // tutorial 28 Demysitifying operator new/delete
		Dog* dg = new Dog();
		//step 1. operator new is called to allocate memory
		//step 2. dog's constructor is called to create dog
		//step 3. if step 2 throws an exception, call operator delete to free memory allocated in step 1
		delete dg;
		//step 1 dog destructor is called
		//step 2 operator delete is caled to free the memory
		//yellowDog28 d = new yellowDog28();
	    //1. Usage error detection:
		    //- meomory leak detection/garbage collection
		    //- array index overrun/underrun.
		//2. improve efficiency:
		    // clustering related objects to reduce page fault
		    // fixed size allocation
		    // align similar size objects to same places to reduce fragmentation
		//3. perform additional tasks
		    // fill the deallocated memory with 0's -security
		    // collect usage statistics
    }*/
	{
	    //toturial 29 how to define new handler
		//int *pgaint = new int[1000000000L];
	//	delete[] pgaint;
	std::set_new_handler(NoMoreMem);
	int *pgaint = new int[1000000000L];
		delete[] pgaint;
    }
    return 0;
}

//better approach is use local defined operator * as below

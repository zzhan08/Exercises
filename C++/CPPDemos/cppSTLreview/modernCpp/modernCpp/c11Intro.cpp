#include "stdafx.h"
#include <vector>
#include <initializer_list>
// all the relevant STL container have been updated accept initializer_list
class bivector {
    std::vector<int> mylist;
public:
    bivector(const std::initializer_list <int> theList) {
        for (std::initializer_list <int>::iterator itr = theList.begin(); itr != theList.end(); itr++) {
            mylist.push_back(*itr);
        }
    }
};

class intro03 {
    
public:
    int age;// 3rd choise
    intro03(int a) {} //2nd choice
    intro03(const std::initializer_list<int>& vec) {}// 1st choice
};
class intro11 {
    int age;
    std::string name;
public:
    intro11(int age,
    std::string name) {
    }
};

class delegate{
public:
    delegate() {} //2nd choice
    delegate(int a) {
        delegate();//do other thing// work in java not c++ 
    } 
};
class delegate2{
    /*cons
      init() regular fn canbe invoke by any other funciton
      cumbersome code
    */
    void init() {};
public:
    delegate2() { init(); } 
    delegate2(int a) { 
        init(); //do other thing //
    } 
};

class delegate11 {
    int age = 9; //c11 allow in class initialization
public:
    delegate11() { }
    delegate11(int a): delegate11() {
        //do something else
        // limitation: only start of this constructor, not mid or end
    }
};
class overide {
    virtual void a(int) {
    }
    virtual void b() const {
    }
};
class overed: public overide {
    virtual void a(float) {  // new fn created
    }
    virtual void b() {       // new fn created
    }
};
class overer : public overide {
    //virtual void a(float) override {  //error out
   // }
    //virtual void b() override {       //error out
   // }
   // void c() override {}//error out
};
class finalClass final {  // no class canbe derived form finalclass
    virtual void bark() final; // no class override bark()
};

class defaulconstructor {
    defaulconstructor(int age) {};// no default construcotr
};
class defaulconstructorP{
public:
    defaulconstructorP(int age) {};
    defaulconstructorP() = default; // force to generate default constructor
    defaulconstructorP& operator=(const defaulconstructorP&) = delete; // c11 delete = assignment operator
};
 template<typename func>
 void filter(func f, std::vector<int> arr) {
     for (auto itr = arr.begin(); itr != arr.end(); itr++) {
         f(itr);
     }

 }
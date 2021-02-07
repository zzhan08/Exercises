// test.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <memory>

#include <iostream>
#include <vector>
#include <string>
#include <stack>

using std::cout;
using std::endl;

struct Noisy {
    std::string name;
public:
    void setName(const std::string& name) {
        std::cout << "Set Noisy const name" << std::endl;
    }
    void setName(std::string& name) {
        std::cout << "Set non-const name" << std::endl;

    }
    virtual void setNames(std::string& name) {
        std::cout << "Set Noisy const name" << std::endl;
    }
    const std::string& getName() {
        return name;
    }
    Noisy() { std::cout << "constructed\n"; }
    Noisy(const Noisy&) { std::cout << "copy-constructed\n"; }
    Noisy(Noisy&&) { std::cout << "move-constructed\n"; }
    ~Noisy() { std::cout << "destructed\n"; }
};

std::vector<Noisy> f() {
    const int &r = 5;
    std::cout <<"=============="<< &r<<"======================"<<r << std::endl;
    std::vector<Noisy> v;
    std::cout << "create temp v" << std::endl;
    v = std::vector<Noisy>(3); // copy elision when initializing v
    std::cout << "before return" << std::endl;                                              // from a temporary (until C++17)
                                                  // from a prvalue (since C++17)
    return v; // NRVO from v to the result object (not guaranteed, even in C++17)
}             // if optimization is disabled, the move constructor is called

void g(std::vector<Noisy> arg) {
    std::cout << "arg.size() = " << arg.size() << '\n';
}
class aggergate: public Noisy {
    int i = 0;
public:
     void setNames(std::string& name) {
        std::cout << "Set aggregate const name" << std::endl;
    }
    aggergate() {};
    aggergate(int i) { i = 55; std::cout << "aggregate" << std::endl; };
};
class mystack {
    
};
class ggog:public aggergate {
    using aggergate::setNames;
};
int xvalue(int & a) {
    return a;
}
int global = 10;
int &foo(){
    return global;
}
namespace {
    void h() { };
}
namespace keonig{
    struct h1 { };
    void gg(h1);
}
void gg(keonig::h1);

constexpr int doubleInt(int x) {
    return x*x;
}
class it {
    std::string name;
public:
    it(std::string n):name(n) {
    }
};
int main() {
    std::vector<int>aaa = { 1,2,3,1,1,2,4,3 };
    aaa.erase(aaa.begin(),aaa.end());
    std::string a = "sdf";
    it *i =new it(a);
    std::shared_ptr<it>p(new it("sa"));
    std::shared_ptr<it>p1(new it("sdb"));
    it * d = p.get();
    std::vector<it*> vit;
    vit.push_back(d);
    
    ///////////////////////////
    int w = 12;
    cout << doubleInt(50) << endl;
    cout << doubleInt(60) << endl;
    cout << doubleInt(w) << endl;
   // std::cin >> w;
  //  cout << "now doubleis "<<doubleInt(w)<<endl;
    keonig::h1 h11;
    //gg(h11);
    std::stack<int> s;
    h();
    cout << "sdfsssssssss" << endl;
    Noisy *nn=new aggergate();
    std::string aaa = "dssdf";
    nn->setNames(aaa);
    /*foo() = 100;
    int i = 2;
    xvalue(i);
    Noisy *n = new Noisy();
    const std::string name = "dog";
    std::string name1 = "dog1";

    n->setName(name);
    n->setName(name1);



    std::vector<Noisy> v;
    std::cout << "cerate v" << std::endl;
    v= f(); // copy elision in initialization of v
                                // from the temporary returned by f() (until C++17)
                                // from the prvalue f() (since C++17)
    //constructed

    std::cout << "g()" << std::endl;
    g(f());                     // copy elision in initialization of the parameter of g()
                                // from the temporary returned by f() (until C++17)
                                // from the prvalue f() (since C++17)
    //constructed
    //copy
    //destructor
    //destructor
    //destructor
    aggergate g = {55};*/
}
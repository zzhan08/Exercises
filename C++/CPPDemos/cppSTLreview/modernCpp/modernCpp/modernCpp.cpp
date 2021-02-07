// modernCpp.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "c11Intro.cpp"
#include <regex>
#include <chrono>
#include <map>
#include <cassert>
#include <vector>
#include <string>
#include <iostream>
#include <sstream>
#include <tuple>
#include "resouceManangement.cpp"
#include "regularExpression.cpp"
#include "clockTimer.cpp"
#include "random.cpp"

void foo(int i);
void foo(char* i);
int aA() {
    return 3;
};
constexpr int aA(int x) { // constexpr improve performance
    return x*x*3;
};
void c11introduction(){
/*Initializer_list*/
    std::vector<int> s = { 1,2,3,4,5 };
    bivector vv= { 1,2,3,4,5 };
    // uniform initialziatin search order:
    // 1. initializaer_list
    // 2. regular construcotr takes the approprete parameter
    // 3. aggregate intitializer
/*Uniform Initialization*/
    //03
    intro03 i03 = { 3}; // Aggregate Initialization if 1st and 2nd choice not found
    //11 extend culy brace inclose initialization
    intro11 i11 = { 3,"cpp" };
/*Auto Type*/ //IDE become more important 
/*ForEach*/
    for (auto i : s) {}
    for (auto &i : s) {// willing to change value need to add &
    }
/*Nullptr*/
   // foo(NULL); // no idea which one is called
  //  foo(nullptr); // call foo(char*)
/*enum class*/
    enum apple { green_a, red_a };
    enum orange { big_a, small_a };
    apple a = green_a;
    orange b = big_a; // a==b
    enum class applea { green, red };
    enum class orangea { big, small };
    applea c = applea::green;
    orangea d = orangea::big; // c!=d
/*static_assert*/
    // runtime assert
    assert(2+2== 4);
    // compile time assert
    static_assert(sizeof(int)==4,"aa");
/*Delegating Constructor*/
/*override(for virtual fn)
To avoid inadvertently create new fn in derived classes
*/   
/* final 
for virtual function and for class
*/
/*compiler generated default constructor*/
/*Delete*/
    defaulconstructorP ad(1);
    defaulconstructorP bd(3.0);
    //ad = bd;//compiler generate operator
/*constexpr*/
    int arr[6];//ok
    //int arr1[aA() + 3];//compiler error because compiler not know aA() always return const value
    //c11
    int arr1[aA(1) + 3];// tell compiler function return const value
/*new string literals*/
    char*a11 = "string";
    //c11
    char* a111=u8"";
    char16_t * b111=u"";
    char32_t * b1111 = U"";
   // char* d=R" " //raw
/*Lambda function*/
    filter([](auto item) {// functional programming
        std::cout << *item << std::endl;
    }, {1,2,3,4,5});
    int y = 12;
    filter([&](auto item) { // access local variable
        if (*item>y) {
            std::cout << y+*item << std::endl;
        }
        std::cout << *item << std::endl;
    }, { 1,2,3,4,5 });
}
void resouceManangement() {
    std::vector<rmPerson>persons;
    persons.push_back(rmPerson("george"));
    persons.emplace_back("george"); // construct object in place (in the space allocated to the vector)
    persons.front().printName();// donot work because *name is laready deleted by ~rmPerson() called
    /*c++03 solution
        1. define copy constructor and copy assignment operator
        2. delete copy constructor and copy assignment operator
    */
    /*c++11 solution
      1. delete keywork delete copy construcotr and cophy assignment operator => prevent being compiled
      2. use vector::emplace_back to create member
      3. use shared ptr to *name
      4. use unique ptr if *name not going to be shared at all but unique pointer cannot be copyied, use std::move to move object to vector
         destrcutor should removed or define a move constructor because if user define destrcutor move constructor cannot be generate so std::move cannot be used
    */
}
void regularExpression() {
    std::string s = "dsaf";
    std::regex e("abc", std::regex_constants::icase);
    /*
    icase : ignore case
    */
    bool match = std::regex_match(s,e);
}
void clockTimer() {
    std::chrono::system_clock; //os system clock - user can change not steady
    std::chrono::steady_clock; // goes at uniform rate
    std::chrono::high_resolution_clock; // provides smallest possible tick period;
    std::ratio<1, 10>r; //1/10 r.num=1, r.den=10
    std::ratio<1, 10>r1; //r.num=1, r.den=5
    std::chrono::system_clock::period::num;
    std::chrono::system_clock::period::den;
    std::chrono::duration<int, std::ratio<1, 1>>;//number of second stored in int
    std::chrono::duration<double, std::ratio<60, 1>>;//number of minutes stored in double
    //nanoseconds, microseconds, milliseconds,seconds, minutes, hours
    //system_clock::duration -- duration<T, system_clock::period>
    std::chrono::microseconds mi(2700);
    std::chrono::nanoseconds na(2700);
    std::chrono::milliseconds mill = std::chrono::duration_cast<std::chrono::milliseconds>(mi);//2 milliseconds high resolution to low resoluction no need duration cast, low to high need duration cast
    mi.count();//2700
    //std::chrono::time_point<>; //represents a point of time  //1,1,1970 epoc of clock based on (UTC)
    std::chrono::system_clock::duration;
    std::chrono::steady_clock::duration;
    std::chrono::system_clock::time_point tp = std::chrono::system_clock::now();
    tp.time_since_epoch().count();// nanoseconds 17 digits
    tp = tp + std::chrono::seconds(2);
    std::chrono::steady_clock::time_point start = std::chrono::steady_clock::now();
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    std::chrono::steady_clock::duration d = end - start;
    std::cout << d.count() << std::endl;
}
void printRandom(std::default_random_engine e) {
    for (int i = 0; i < 10; i++) {
        std::cout << e() << " ";
    }
    std::cout << std::endl;
}
void randomCPP() {
    /*
      random engine
    */
    std::default_random_engine eng;
    std::default_random_engine eng1;
    std::cout << eng.min() << "|" << eng.max() << std::endl;
    std::cout << eng() << std::endl;
    std::stringstream state;
    state << eng;  // save current state for random engine
    state >> eng;  // restore state of random engine
    printRandom(eng);
    printRandom(eng1);

    unsigned seed = std::chrono::steady_clock::now().time_since_epoch().count();
    std::default_random_engine eng3(seed);
    printRandom(eng3);
    eng3.seed();
    printRandom(eng3);
    eng3.seed(109);
    printRandom(eng3);
    eng1.seed(109);
    if (eng1 == eng3) {
    }
    std::vector <int> a{ 1,23,4,5,6,6,6 };
    std::shuffle(a.begin(), a.end(), std::default_random_engine());
// RANSOM DISTRIBUTION
    unsigned seed = std::chrono::steady_clock::now().time_since_epoch().count();
    std::default_random_engine df(seed);
  //range [0,5]
    std::cout << df() % 6 << std::endl;
    //bad quality for randomness, uniform distribution
    std::uniform_int_distribution<int>distr(0, 5);//[0,5]
    std::cout << distr(df) << std::endl;
    std::uniform_real_distribution<double>distr1(0, 5);//[0,5)
    std::cout << distr1(df) << std::endl;
    std::poisson_distribution<double>distr2(1.0);//[0,5)
    std::cout << distr2(df) << std::endl;
    std::normal_distribution<double>distrN(10.0, 3.0);//[0,5)
    std::cout << distrN(df) << std::endl;
    std::vector<int> v(20);
    for (int i = 0; i < 800; i++) {
        int num = distrN(df);
        if (num >= 0 && num < 20) {
            v[num]++;
        }
    }
}
void tuplecpp() {
    std::pair<int, std::string>p = std::make_pair(23, "heel");
    std::tuple<int, std::string, char>t(32, "s", 'y');
    std::get<1>(t) = "sdfdsfdsf";
    std::string& ss = std::get<1>(t);
    //get<3>(t) not compile
    std::vector<int> v(4);
    v[1] = 3;
    int i = 1;
    std::tuple<int, std::string, char>t2;
    t2 = std::tuple<int, std::string, char>(1,"ff",'2');
    t2 = std::make_tuple(33, "ssds", 'd');
    // tuple can store references
    std::ref(t2);
    std::make_tuple(std::ref(t2));
    int x; std::string y; char z;
    std::tie(x, y, z) = t2; // the same as make_tuple
    std::tie(x, std::ignore, z) = t2;
    auto t4 = std::tuple_cat(t2, t);////t4 add two tuples
    std::tuple_size<decltype(t4)>::value;// number of element
    std::tuple_element<1, decltype(t4)>::type d;// typ of second element
}
std::tuple<std::string, int> getNameAge() {
    return std::make_tuple("bob",34);
}
void tupleVsStruct(){
    struct Person { std::string name; int age; };
    std::tuple<std::string, int> t;
    // achieve the same goal
    // struct more readable
    // tuple one time only structure, fast transfer data
    std::string name;
    int age;
    std::tie(name, age) = getNameAge();
    //comparison of tuples
    std::tuple<int, int, int>t1, t2;
    if (t1 > t2) {
        std::cout << "time1 is a later time";

    }
    std::map<std::tuple<int, char, float>, std::string> m;
    m[std::make_tuple(2, 'a', 2.3)] = "dsfds";
    
}
int main()
{
    //c11introduction();
    //resouceManangement();
    //regularExpression();
    //clockTimer();
    //randomCPP();
    //tuplecpp();
    tupleVsStruct();
    return 0;
}


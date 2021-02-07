// review.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <ostream>

#include "constFunction.cpp"
#include "logicAndBitwiseConstness.cpp"
#include "virtualDestructor.cpp"
#include "preventExceptLeavDestructor.cpp"
#include "virtufnInConstructORDestruct.cpp"
#include "SourceAcquizationInitialization.cpp"
#include "initializationFiasco.cpp"
#include "resourceManage.cpp"
#include "virtualCLone.cpp"
#include "implicitTypeConversion.cpp"
#include "keneoigLookup.cpp"
#include "keonigLookupAndNamespaceDesign.cpp"
#include "demystifyingOperator.cpp"
#include <windows.h>
#include <Wincrypt.h>
#include <Winhttp.h>
#pragma warning(disable:4996)
#pragma comment(lib, "crypt32.lib")
#pragma comment(lib, "winhttp.lib")
void constKeyWord();
void RLvaluesIntro();
int sum(int, int);
int square(int&);
int square(const int&);
int &foo();
void logicBitwiseConstnessIntro();
int myglobal;
void virtualDestructorIntro();
void preventExceptionLeaveDestructorIntro();
void virtualFnInConstrucotrorDestructor();
void selfAssignOperator();
void resourceAcquisitionInInitIntro();
void test();
void train(std::tr1::shared_ptr<sadog>, sadogtrick);
void fiascoIntro();
void resourceManageIntro();
void virtualCloneIntro();
void implicitTypeConversion();
void castingIntro();
void keneoniglookupintro();
void keonigLookupAndNamespaceDesignintro();
void demystifyingOperatorIntro();
/*namespace std {
    template<class InputIterator, class T>
    T accumulate(InputIterator first, InputIterator last, T init) {
        while (first != last) {
            init = init + *first++;
        }
        return init;
    }
}*/
namespace A {
  struct structX {};
  void callstruct(structX x) {
    std::cout << "call struct" << std::endl;
  }
  void callstruct() {
      std::cout << "call struct" << std::endl;
  }
  class C {
  public:
     void f();
     void g();

  };
  //void h(C);
  //std::ostream & operator<<(std::ostream&, const C&);
}
int operator +(A::C, int n) { return n + 1; }
int main()
{
    //constKeyWord();
    //RLvaluesIntro();
    //logicBitwiseConstnessIntro();
   // virtualDestructorIntro();
   // preventExceptionLeaveDestructorIntro();
   // virtualFnInConstrucotrorDestructor();
   // test();
    //resourceAcquisitionInInitIntro();
    //fiascoIntro();
    //resourceManageIntro();
    //virtualCloneIntro();
    //implicitTypeConversion();
    //castingIntro();
    //keneoniglookupintro();
   // keonigLookupAndNamespaceDesignintro();
    demystifyingOperatorIntro();
    return 0;
}
void demystifyingOperatorIntro() {

    newMem *nm = new newMem();
    newerMem *nerm = new newerMem();
    newMem *de = new newerMem();
    delete de;// static virtual cannot be used together, so newMem delete will be called not newerMem 
    /*
        why customize operator new/delete
    1. usage error detection:
    - memory leak detection/garbage colleciton
    - array index overrun/underrun
    2improve efficiency:
    a. clustering related object to reduce page fault
    b. fixed size allocation
    c. align similar size objects to same places to reduce fragmentation
    3. perform additional tasks:
    a. fill the dealocated memory with 0's - security
    b. collect usage statistics.


    */
}
/*void keonigLookupAndNamespaceDesignintro() {
   // A::structX sx;
  //  callstruct(sx); // parameter trigger keonig lookup
   // callstruct();//error
    std::cout << "show keonig lookup";
    std::operator<<(std::cout, "show keonig lookup");
    A::C arr[3];
    std::accumulate(arr, arr + 3, 0);

}
*/
void keneoniglookupintro() {
    A::structX sx;
    callstruct(sx);
    /*
    name look up sequence
    namespace:
      current scop => next enclosed scope => ... => global scope
      To override the sequence:
        1. Qualifier or using declaration
        2. Koenig look up
    class:
      current scop => parent scope => ... => global scope
      To override the sequence:
        1. Qualifier or using declaration
    name hiding
    */
}

void castingIntro() {
   /*
   static_cast one type  to another
   */
    int i = 9;
    float f = static_cast<float>(i);
    implicity implicityx = static_cast<implicity>(std::string("aa"));// conversion fn need to be defined
    virtualClone* implicityptr = static_cast<virtualClone*>(new clone());// convert point or referent from one type to related type
    /*
    dynamic_cast one type  to another
        only on pointer or reference-> one type ot related type
        specialy down type cast
        run time type check
        two type to be polymorphic
    */
    virtualClone* vc = new clone();
    //clone c = dynamic_cast<virtualClone*>(vc);
    /*
    const_cast
        only pointer /reference
        only same type
        castaway constness of pointer to a object
    */
    /*
        reinterpret_cast
        ontly pointer or reference
    */
    /*
    c-style casting
    */
}
void implicitTypeConversion() {
    char c = 'a';
    int i = c;
    char* pc = 0;
   // void f(int i);
   // f(c);
    implicity implicity1 = "bob";
    printf( "nameis %s.\n",implicity1);
    impliRa r1 = 23;
   // impliRa r2 = r1 * 2;
   // impliRa r3 = 3 * r1;
}
void virtualCloneIntro() {
    virtualClone* vc = new clone();
    virtualClone * vd = new virtualClone(*vc);
}
void resourceManageIntro() {
    std::vector<reManager*> mangers;
    mangers.push_back(new reManager("aa"));
    mangers.back()->print();
}
void fiascoIntro() {
    fiaso theone("no 1. ");

    theone.show();
}

void test() {
    CRYPT_DATA_BLOB data;
    FILE *fIn = fopen("D:\\certificate.p12", "rb");
    fseek(fIn, 0, SEEK_END);
    data.cbData = ftell(fIn);
    fseek(fIn, 0, SEEK_SET);
    data.pbData = (BYTE *)malloc(data.cbData);
    fread(data.pbData, 1, data.cbData, fIn);
    fclose(fIn);
    HCERTSTORE hCertStore = PFXImportCertStore(&data, L"du2vmi9n", 0);
    PCCERT_CONTEXT hContext = CertFindCertificateInStore(
        hCertStore, X509_ASN_ENCODING | PKCS_7_ASN_ENCODING, 0, CERT_FIND_ANY,
        NULL, NULL);

    std::cout << hCertStore << std::endl;
}

void resourceAcquisitionInInitIntro() {
    // example 1
        std::mutex mu;
        mu.lock();
        // what if exception or return mu will be locked forever
        mu.unlock();
        //solution
        lock mulock(&mu);
    // example 2 shared pointer responsible for reource control
        std::tr1::shared_ptr<sainit> saintt(new sainit());

    // example 3
        sadogtrick getTrick();
        //train(std::tr1::shared_ptr<sadog> zz(new sadog()), getTrick());// if new sadog created then getTrick throw exception then shared ptr will not be assinged and memory leak

        std::tr1::shared_ptr<sadog> pd(new sadog());
       // train(pd, getTrick());
     // example 4
        lock mulock1(&mu);// mutex not be allowed to be copyed
        lock L2(mulock1); 
        //solutions: disallow copy & use reference counter (shared_ptr)
       // template<class someType, class D> shared_ptr(someType* ptr, D deleter);
}
void selfAssignOperator() {
    // avoid self assignment
}
void virtualFnInConstrucotrorDestructor() {
    vfnCODChild vchild;
    vchild.showDIff();
    // delete child then delete base
}
void preventExceptionLeaveDestructorIntro() {
    try {
        preExcLeavDest peld1("exam1");
        preExcLeavDest peld2("exam2");
        peld1.show();
        peld2.show();
        /*output: exam1 and exam2 start on stack, stack is last in first out, so exam 2 destoryed first
        exam 1 born
        exam 2 born
        exam 2 destoryed
        exam 1 destoryed*/
        peld1.prepareThrowException();
        peld2.prepareThrowException();

    }
    catch (int e) {
        std::cout << e << std::endl;
    }
    

}
void logicBitwiseConstnessIntro() {
    BigArray b;
    b.setItem(0, 5);
}
void virtualDestructorIntro() {
    virt *vd = vtDestructorFactory::createVD();
    std::shared_ptr<virt> vd1 = vtDestructorFactory::createVDshared();
    delete vd;
}
void RLvaluesIntro() {
    std::cout << "==================R value introduction==================" << std::endl;

    // Rvalue Example
    int x = 2; int i = 3;  // 2 is rvalue
    int x1 = i + 2;        // i+2 is rvalue
    //int * p = &(i + 2);  // cannot get reference of rvalue
    dog *d = &(dog());     // dog() is rvalue of dog type
   // int sum34 = sum(3, 4); // sum(3,4) is rvalue

    // lvalue reference
    int y;
    int & z = y; // lvalue reference
    std::cout <<z << std::endl;
   // int & z = 5; // exception error right side has to be a reference
    const int& w = 5;
    // exception, lvalue w is const, canbe assigned a rvalue
    square(32); //param should be a lvalue
    square(y); //param should be a lvalue

    // lvalue canbe used create rvalue
    int lvalue = 1;
    int lvlaue2 = lvalue + 2;
    int lvalue3 = lvalue;
    // rvalue can be used to create lvalue
    int v[3];
    *(v + 2) = 4; // (v+2) is rvalue, dereference of v+2 is lvalue which can be assigned to a value;

    // missconcept1: funciont or operator always yields rvalues, function can return lvalue (reference of lvalue)
    int x2 = i + 3;
    //int y1 = sum(3 , 4);
    int arr[] = { 5 };
    arr[0] = 50;
    // missconcept2: lvalue is modifiable if funciton return const reference
    const int wc = 5;
    //wc = 6;
    // missconcept3: rvalues not modifiable, not true for user defined types
    //i + 3 = 6;
    dog dg=dog();
    dg.setAge(1);

    //summary: c++ expression yield rvalue or lvalue
    // expression has identifiable memory address -> lvalue , or rvalue;

}
int &foo() {
    return myglobal;
}
int square(int & input) {
    std::cout << "square" << std::endl;

    return input* input;
}
int square(const int & input) {
    std::cout << "const square" << std::endl;
    return input* input;
}
void constKeyWord() {
    std::cout << "=================='const' keyword==================" << std::endl;

    const int i = 9;
    const int * p1 = &i; // modify p1's pointer successfully, p1 value is const
                         //data is const, pointer is not;
                         //int * const p2 = &i; // modify p2's const pointer not successfully, p2 value is not const, p2's point is const
    const int* const p3 = &i;
    int const * p = &i;
    int const * p4; //  == const int * p4;
                    // const is on the right of* , pointer is const
                    // const is on left of * data is const
    const_cast<int&> (i) = 6; // cast a const to regular value  
    static_cast<const int&>(i); // cast a value to a const value
    dog* d = new dog();
    int i1 = 9;
    d->setAge(i1);
   
    std::cout << i1 << "|" << d->getName() << std::endl;

    const dog constd;
    dog nonconstD;
    constd.printName();
    nonconstD.printName();

    nonconstD.setAge(i1);
    nonconstD.setAge(i);

}
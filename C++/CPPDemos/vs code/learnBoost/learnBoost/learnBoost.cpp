// learnBoost.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include<boost/lexical_cast.hpp>
#include<boost/lexical_cast/bad_lexical_cast.hpp>

using boost::lexical_cast;
using boost::bad_lexical_cast;

using namespace std;
/****************************************lexical_cast*******************************************************
int main()
{
	// 1. c++ functions to convert between types => too many function to rember
	// 2. old c fucntion to convert between types => not safe
	//sscanf();
	//sprintf();
	// 3. using stringstream to convert different types => too complex method for this operation
	std::stringstream strm;
	int int_val = 0;
	strm << int_val;
	string s = strm.str();
	// 4. using boost::lexical_cast =>  powerful, simple
	int v = 23;
	string str = lexical_cast<string>(v);
	array<char, 64>msg = lexical_cast<array<char,64>>(23);
	v = lexical_cast<int>("2342");
	try {
		v = lexical_cast<int>("23.42");// invalid cast, 23.42 is not int=>exception: bad_lexical_cast
	}
	catch (bad_lexical_cast &e) {
		cout << e.what() << endl;

	}
	//v = lexical_cast<int>("2342ty");// invalid cast,=>exception: bad_lexical_cast
    v = lexical_cast<int>("2342ty",4);// good cast => 2342

	cout << str << endl;
    return 0;
}*/
/****************************************variant******************************************************
#include<boost/variant.hpp>
#include<vector>
int main() {
	//union => as example below, u can store either integer or float, not both at the same time 
	union { int i; float f; } u;
	u.i = 32;
	u.f = 3.2;//=> u.i is overwriten
	//union { int i; string s; } u1;// not compare because union only work with plain datatype=>need string for union,because c++ always use string
	//1. boost variant solve this problem
	boost::variant<int, string>u1, u2;
	u1 = 2;
	u2 = "hello";
	cout << u1 << "|" << u2 << endl;
	//u1=u1*2
	u1 = boost::get<int>(u1) * 2;
	string st = boost::get<string>(u1);//throw exception of bad_get
	u1 = "good";
	string st = boost::get<string>(u1);//good get
	u1 = 3;
	boost::variant<int, string>u3;//constructed with first type in typelist=> integer
	cout << u3 << endl;
	boost::variant<int, string,bool,long,double>u4;//constructed with first type in typelist=> integer
	//2. dont know the parameter type of variabt as below
	void Double(boost::variant<int, string>v) ;
	// using visitor to solve this=> flexible and safe
	class doublievisitor :public boost::static_visitor<> {
	public:
		void operator()(int& i)const {
			i += i;
		}
		void operator()(string& str)const {
			str += str;
		}

	};
	u3 = 2;
	boost::apply_visitor(doublievisitor(),u3);//u3=4;
	u3 = "sdf";
	boost::apply_visitor(doublievisitor(), u3);//u3=sdfsdf;
	vector<boost::variant<int, string> >vec;
	vec.push_back("sdf");
	vec.push_back(23);
	vec.push_back("sdwf");
	doublievisitor f;
	for (auto x : vec) {
		boost::apply_visitor(f,x);
	}
}*/

/****************************************any*****************************************************
#include<boost/any.hpp>
#include<vector>
int main(){
	//any store any type data, variant store limited types of data
	//variant use stack mememroy management
	//any use dynamic memory manangement
	boost::any x, y, z;
	x = string("hellow");
	x = 2.3;
	y = 'z';
	z = vector<int>();
	cout << boost::any_cast<char>(y) << endl;// return copy of y data 'z'
	cout << boost::any_cast<double>(x) << endl; // return copy of x data 2.3
	cout << boost::any_cast<int>(x) << endl; // return exception bad_any_cast
	cout << boost::any_cast<float>(x) << endl; // return exception bad_any_cast
	if (x.empty()) {
		cout << "x is empty" << endl;
	}
	if (x.type() == typeid(char)) {
		cout << "x is a char" << endl;
	}
	boost::any_cast<vector<int>>(z).push_back(23); // any_cast return copy of z, it didnt insert 23 to z 
	int i = boost::any_cast<vector<int>>(z).back();// then this code crash because z still empty
	int i;
	boost::any p = &i;
	int * pInt = boost::any_cast<int*>(p);// return a pointer
	vector<boost::any>m;
	m.push_back(2);
	m.push_back('a');
	m.push_back(p);
	m.push_back(boost::any());
	struct property{
		string name;
		boost::any value;
	};
	vector<property> properties;

}*/
/****************************************optional*****************************************************/
#include<boost/optional.hpp>
#include<deque>
#include<boost/variant.hpp>

deque<char>queeu;
char getAsync_data() {
	if (!queeu.empty) {
		return queeu.back();
	}else {
		return '\0';//this si a valid char,
	}
}
boost::optional<char> getAsync_dat1a() {
	if (!queeu.empty) {
		return	boost::optional<char>(queeu.back());
	}else {
		return boost::optional<char>();
	}
}
int main() {
	boost::variant<nullptr_t, char>v;
	boost::optional<char>op;
	op = 'a';
	op=getAsync_dat1a();
	if (!op) {//op!=0
		cout << "op is  empty";
	}
	else {
		cout << "op is not empty, contain: " << op.get();//if op is empty => crash is op is unitialized
		cout << "op contain: " << *op << endl;//*op is not a pointer, optional canbe used like a pointer, but it is not modalled as a pointer
	}
	op.reset();// set op to uninitialized state
	op.get_value_or('z');// if init return value, ifnot return 'z'
	char *p = op.get_ptr();//return null if op is empty
	//optional can store any kind of data
	struct A { string name; int value; };
	A a;
	boost::optional<A> opA(a);// a is copy constructed into opA
	cout << opA->name << " " << opA->value << endl;
	//Pointer
	boost::optional<A*>opAP(&a);
	(*opAP)->name = "bob";// changes a.name
	(*opAP)->value = 123;// changes a.value
	//relational operator
	boost::optional<int>i1(1);
	boost::optional<int>i2(9);
	boost::optional<int>i3;

	if (i1 < i2)//it is the same as if(*i1<*i2)
		cout << "i2 is bigger";
	//note: i3 is smallest because it is unintialized
}

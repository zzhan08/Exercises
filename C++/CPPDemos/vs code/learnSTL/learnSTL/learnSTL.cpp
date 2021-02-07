// learnSTL.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>
/*********************************** 1. Templates ***************************************
// Difference between function template and class template: no need specify data type for function template, but has to specify data type for class template
using namespace std;

int squre(int x) {
	return x*x;
}
template<typename T>
T squreTemplate(T x) {
	return x*x;
}
template<typename T>
class boVector {
	T arr[1000];
	int size;
public:
	boVector() :size(0) {}
	T get(int i)  const  { return arr[i]; }
	int getSize()  const  { return size; }
	void push(T x) { arr[size] = x; size++; }
	void print()  { for (int i = 0; i < size; i++) { cout << arr[i] << endl; } }
};
// *******function have const bovector as parameters so it only calls const fucntions inside bovector class ********
template <typename T>
boVector<T>operator*(const boVector<T>& rhs1, const  boVector<T>& rhs2) { 
	boVector<T> ret;
	for (int i = 0; i < rhs1.getSize();i++) {
		ret.push(rhs1.get(i)*rhs2.get(i));
	}
	return ret;
}
// *************************************************************************************************************
int main()
{
	cout << squre(5) << endl;
	cout << squre(5.5) << endl;
	cout << squreTemplate(5) << endl;  // based paramter type squreTemplate template run time create differnet function and has own memory space
	cout << squreTemplate(5.5) << endl;
	boVector<int> bv;
	bv.push(1);	bv.push(2);
	bv.push(3);
	bv.push(4);
	bv.push(5);
	bv.print();
	boVector<double> b1v;
	b1v.push(1.1);	b1v.push(2.1);
	b1v.push(3.1);
	b1v.push(4.1);
	b1v.push(5.1);
	b1v.print();
	bv=squreTemplate(bv);
	bv.print();
    return 0;
}*/
/*********************************** 2. c++ Standard Template Library **************************************
#include<vector>
#include<algorithm>
using namespace std;
int main() {
	std::vector<int>rec;
	rec.push_back(1);
	rec.push_back(12);
	rec.push_back(3);
	// %%%%%%%%%%%%% half-open:[begin, end) &&&&&&&&&&&&&&&
	std::vector<int>::iterator bit = rec.begin();
	std::vector<int>::iterator eit = rec.end();
	for (std::vector<int>::iterator runner= bit; runner != eit; ++runner) {
		cout << *runner << " " << endl;
	}
	std::sort(bit, eit);
	for (std::vector<int>::iterator runner= bit; runner != eit; ++runner) {
		cout << *runner << " " << endl;
	}

}*/
/*********************************** 3. c++ Sequence containers (array, linked list) **************************************
// sequence containers: vector, deque, list, forward list, array
#include<vector>
#include<deque>
#include<list>
#include<array>
#include<algorithm>
int main() {
	//_________________________________vector_________________________________
	// Vector can only grow at the end of vector
	std::vector<int>rec;//rec.size() == 0
	rec.push_back(1);
	rec.push_back(12);
	rec.push_back(3);//rec.size() == 3
	// Vectorspecific operations:
	std::cout << rec[2]; // 8 (no range check)
	std::cout << rec.at(2); // 8 (nthrow range_error exveption of out of range) 
	for (int i=0; i < rec.size(); i++) {
		std::cout << rec[i] << " ";
	}
	std::cout << std::endl;
	// 1 iterator is faster way than random access rec[i]
	// 2 iterator is universal way to treverse a container
	std::cout << std::endl;
	for (std::vector<int>::iterator it = rec.begin(); it != rec.end(); ++it){  
		std::cout << *it << " ";
	}
	std::cout << std::endl;
	//c++ 11
	for (auto it:rec) {   
		std::cout << it << " ";
	}
	std::cout << std::endl;
	// vector is dynamically allocated contiguous array in memory
	int *p = &rec[0];
	// common member functions of all containers: empty(), size(), clear(), swap()
	// rec:{1,12,3}
	if (rec.empty()) { std::cout << "rec is empty" << std::endl; }
	std::cout << "size: "<< rec.size() << std::endl;
	std::vector<int> empty;
	std::vector<int> empty2(rec);//copy constructor
	rec.swap(empty);//rec empty, empty has 3 items
	std::cout << "size: " << rec.size() << std::endl;
	std::cout << "size: " << empty.size() << std::endl;
	empty.clear();//remove all inside rec
	std::cout << "size: " << rec.size() << std::endl;
	std::cout << "size: " << empty.size() << std::endl;
	// Note: No penalty of abstraction, very efficient
	// Properties of vector: 
	// 1. fast insert/remove at the end:o(1)
	// 2. slow insert/remove at the begining or in the middle: O(n), when insert at start/middle, rest elements has to shift as well
	// 3. slow search: O(n)
	//_________________________________Deque_________________________________
	// Deque can grow at both the beginning and the end of vector
	std::deque <int> deq = { 4,5,6 };
	deq.push_back(2);
	deq.push_front(1);
	//has simmilar interfaeces with vectorS
	std::cout << deq[1];//4
	// Properties of deque: 
	// 1. fast insert/remove at begining and at the end:
	// 2. slow insert/remove in the middle: O(n), when insert at middle, rest elements has to shift as well
	// 3. slow search: O(n)
	//_________________________________list_________________________________
	// it is double linked list
	// much slower than vector, because stored not in contiguous memory, when retreive inside cache will slow down programme 
	// list will consume more memory=>more cache miss and more page faults
	std::list<int>mylist = { 5,2,9 };
	mylist.push_back(3);//{5,2,9,3}
	mylist.push_front(1);//{1,5,2,9,3}
	std::list<int>::iterator itr = std::find(mylist.begin(), mylist.end(),2);
	mylist.insert(itr, 10); //{1,5,10,2,9,3} //take constant time, very fast
	itr++;
	mylist.erase(itr);//{1,5,10,2,3} //take constant time, very fast
	// Properties of list: 
	// 1. fast insert/remove at any position:
	// 2. slow search: O(n)
	// 3. no random access, no [] operator
	// 4. splice() funtion very important for list
	// mylist.splice(itr, mylist2,itra,itrb) // splice() cut data range specfied by itra, itrb of data in mylist2 then insert into mylist and it only take constant time
	//_________________________________forward list_________________________________
	// single linked list from beginning to the end
	//_________________________________Array_________________________________
	int a[3] = { 3,4,5 };
	std::array<int, 3>a1 = { 3,4,5 };
	a1.begin();
	a1.end();
	a1.size();
	a1.swap(std::array<int, 3>());
	//limitations: 1. size cannot be changed  2. two array of integer could have different type
	std::array<int, 4>a2 = { 3,4,5 };
	//a1 and a2 are different type, if fucntion take array parameter of size 3, then it will not take array parameter of size 4
}*/
/*********************************** 3. c++ Associative containers () *************************************
// 1 always sorted default critia is <
// no push_back, push_front()
#include<set>
#include<map>
int main() {
	//____________________________________set__________________________________________
	// not allow duplicated items

	std::set<int>myset;
	myset.insert(1);
	myset.insert(7);
	myset.insert(3); // insert take o(log(n)) time
	std::set<int>::iterator itr;
	//sequence container dont even have find() member fucntion
	itr = myset.find(7); // itr will points to 7 // search take o(log(n)) time very important in associative
	std::pair<std::set<int>::iterator, bool>ret;
	ret = myset.insert(3); // no new element inserted, return pair as result, first=iterator of insert posiiton(successful insert element position or failed position when there is duplicated data ), second is sucessful or not
	if (ret.second == false) {
		itr = ret.first;
	}
	myset.insert(itr,9); // itr point to element of 3, then insert 9 to the end based on value of inserted element, itr provide hint to find location 9 should be insert, good itr will reduce time of insertion
	myset.erase(itr);// delete element at iteraotr itr
	myset.erase(7);// remove by value, slow
	//____________________________________multiset__________________________________________
	// allow duplicated items
	// set/multiset:value canont be modified it is read only
	std::multiset<int>::iterator itra;
	//*itr = 10;//*itr is constant cannot be modifyed
 	// Properties of deque: 
	// 1. fast search:O(log(n))
	// 2. traverse is slow (conpare with vector deque)
	// 3. no random access, no [] operator
	// 4. allow duplicated data so insertion will always successfully
	//____________________________________map__________________________________________
	//not duplicated keys
	// key is const cannot be modifyed
	std::map<int, char> newmap;
	newmap.insert(std::pair<const int,char>(1,'s'));// key is automatically passed as constant value
	newmap.insert(std::make_pair(2, 'd'));
	std::map<int, char>::iterator itrm = newmap.begin();
	newmap.insert(itrm, std::pair<int, char>(3, 'j'));
	itrm=newmap.find('j');
	for (auto each : newmap) {
		std::cout << each.first << ":" << each.second << std::endl;
	}
	for (std::map<int, char>::iterator itr = newmap.begin(); itr != newmap.end();itr++) {
		std::cout << itr->first << ":" << itr->second << std::endl;
	}
	//____________________________________multimap__________________________________________
	//allow duplicated keys
	// key is const cannot be modifyed
	std::multimap<int, char> newmap1;
	newmap1.insert(std::pair<const int, char>(1, 's'));// key is automatically passed as constant value
	newmap1.insert(std::make_pair(2, 'd'));
	std::multimap<int, char>::iterator itrm1 = newmap1.begin();
	newmap1.insert(itrm1, std::pair<int, char>(3, 'j'));
	itrm1 = newmap1.find('j');
	for (auto each : newmap1) {
		std::cout << each.first << ":" << each.second << std::endl;
	}
	for (std::multimap<int, char>::iterator itr = newmap1.begin(); itr != newmap1.end(); itr++) {
		std::cout << itr->first << ":" << itr->second << std::endl;
	}
	
}*/
/*********************************** 4. c++ Unordered associative containers () ************************************
#include <unordered_set>
#include <unordered_map>
#include <vector>
#include <fstream>
#include <istream>
using namespace std;
void foo( std::unordered_map<char, string>& m) {
	//cout << m['s'] << endl;//cannot compile, subscribtion operator[] provide write operation to contain so it will fail
	std::unordered_map<char, string>::const_iterator ite = m.find('s');// const_iterator no write operation
	if (ite != m.end()) { cout << ite->second << endl; }
}
int main() {
	// although hastable provde constant time searching but the performance may duduced by has collision(many item insert into same bucekt/ all elemenets in one bucket)
	// Properties of Unordered containers:
	// 1. fastest search/insert at any place: O(1)
	//    Associative container takes O(log(n))
	//    vector, deque takes O(n)
	//    list takes O(1) to insert, O(n) to search
	// 2. unordered set/multiset: element value cannot be changed
	//    unordered set/multiset: element key cannot be changed
    //____________________________________________unordered set_____________________________________________
	// not allow duplicated items
	std::unordered_set<string>uset = {"a","b","c","dsf"};
	std::unordered_set<string>::const_iterator itt = uset.find("dsf"); // if find return iterator of position, otherwise return iterator to the end
	if (itt != uset.end()) {//impotant check
		cout << *itt<< endl;
	}
	std::vector <string> newv = { "as","ass" };
	uset.insert(newv.begin(), newv.end());//insert vector elements into unordered_set
	//Hash table specific APIs
	cout << "load_factor = " << uset.load_factor() << endl; //ratio of total number element / total capacity
	string x = "as";
	cout << x << " is in bucket " << uset.bucket(x) << endl;//return posion of x
	cout << x << " total buckett " << uset.bucket_count() << endl;//reutrn total capacity of unordered_set
	//____________________________________________unordered multiset_____________________________________________
	//allow duplicated items
	//____________________________________________unordered map_____________________________________________
	//not allow duplicated items
	//unordered set of pairs
	//____________________________________________unordered multimap_____________________________________________
	//allow duplicated items
	//unordered_set of pairs
	//---------------------------------------implementation of associative array(map and unorderedd map)--------------------------------------------
	// 1. search time : unordered_map, O(1); map, o(log(n))
	// 2. unordered_map may degrade to o(n);
	// 3. cant use multimap and unordered_multimap, they have no [] operator, have not unique keys
	std::unordered_map<char, string>day = { {'s',"sds"},{'f',"fdsf"} };
	cout << day['s'] << endl;
	cout << day.at('s') << endl;
	std::vector<int> vec = { 1,2,3 };
	//vec[5] = 5; //compile error [5]not created yet
	day['w'] = "wewrw";//call insert{'w',"wewrw"} for map
	day.insert(std::make_pair('x',"xds"));
	day.insert(std::make_pair('s', "ddgfdg"));//failed to modify, insert canot use to modify elemetn
	day['s'] = "sdfsdf";//succeed to modify, subscribe [] can use to modify provide right access to element
	foo(day);
	//_________________________________________container adaptor________________________________
	//provide a restricted interface to meet special needs
	//implemented with fundamental container classes
	// 1. stack: LIFO, push(), pop(), top()//top() allow get element at top
	// 2. queue: FIFO, push(), pop(), front(), back()
	// 3. priority queue: (first item always has then greatest prority) push(), pop(),top() 
	// another way of categorizing containers:
	// 1. array based containers: vector, deque
	// 2. base containers: list+associative container+ unordered containers
	// array based container invalidates pointers: native pointers, iterators, references
	std::vector<int>vec = { 1,2,3,4,5 };
	int*p = &vec[2];
	vec.insert(vec.begin(), 0);
	cout << *p << endl;  // undefined behaviour, p should be invalid or undefined behaviour, vector vec pointer p should be stop used, base containers pointers are still valid
}*/
/*********************************** 4. c++ Iterators and algorithm ***********************************
#include<vector>
#include<list>
#include<deque>

#include<iterator> 
#include<memory>
#include<forward_list>
#include<set>
#include<algorithm>
using namespace std;
void myfunction(int Nitr){
	std::cout << Nitr << std::endl;
}
bool isodd(int i) {
	return i % 2;
}
int main() {
    //_____________________________________Iterators________________________________________
	// 1. random access iterator: vector, deque, array
	//    access to any postion in container and comparation with each other
	//vector<int> em;
	//vector<int>::iterator itr1;
	//vector<int>::iterator it2r;
	//itr1 = itr1 + 5;//advance itr by 5
	//it2r = it2r - 4;
	//if ( itr1 > it2r ) {
	//	++itr1; // is faster than itr1++; preincremetal is faster because it doesnt has to return old value which store in tempurary veriable
	//} else {
	//	itr1--; // is faster than itr1--;
	//}
	// 2. Bidirectional iterator: list, set/multiset, map/multimap
	//    be able to increment and decrement but cannot add or substruct => no random access
	//list<int>itrl;
	//list<int>::iterator itrl1;
	//list<int>::iterator itrl2;
	//itrl1++; itrl1--;// 
	//itrl1 = itrl1 + 5; //not compiled
	//itrl2 = itrl2 - 5; //not compiled
	// 3. forward iterator: forward_list
	//    can only be incremented, not decremented => no random access
	//forward_list<int>itrf;
	//forward_list<int>::iterator itrf1;
	//forward_list<int>::iterator itrf2;
	//itrf1++;
	//itrf2--;//not compiled
	// 4. Unordered containers 
	//    provide "at least" forward iterators, but it has option to provide bidirectional iterator
	// 5. Input iterator
	//    read and process values while iterating forward, can read dereferenced iterator cannot write
	// int x = std::iterator<int> itri;// only can read, not write
	// 6. Output iterator
	//    Output values while iterating forward, can write dereferenced iterator cannot read
	// std::iterator<int> *itri = 100
	// 7. const iterator
	// every container has a iterator and a const_iterator
	// const_iterator provide read only access
	vector<int>::iterator Nitr;
	vector<int>::const_iterator itrConst;
	vector<int> myset = { 1,2,3,4,5 };

	//for (Nitr = myset.begin(); Nitr != myset.end(); Nitr++) {
	//	std::cout << *Nitr << std::endl;
	//	*Nitr = 3;
	//	std::cout << "AFTER"<<*Nitr << std::endl;
	//}
	for (itrConst = myset.begin(); itrConst != myset.end(); itrConst++) {
		std::cout << *itrConst << std::endl;
		//*itrConst = 3;//not compile
		std::cout << "AFTER" << *itrConst << std::endl;
	}
	// c++ 11 provide for_each() access container
	std::for_each(myset.begin(), myset.end(), myfunction);
	std::for_each(myset.begin(), myset.end(), [](int each) {
		std::cout << each << std::endl;
	});
	vector<int>::iterator vect1= myset.begin();

	vector<int>::iterator vec2= myset.end();

	std::cout<<std::distance(vect1, vec2)<<std::endl;//measure distance between vect1 vec2
	std::advance(vect1,3);// move vect1 3 steps forward 
	std::cout << *vect1 << std::endl;
	// *********************************Iterator Adaptor (Predefined Iterator) - a special, more powerful iterator********************************
	// 1. Insert iterator
	vector<int> myset1 = { 1,2,3,4,5 };
	vector<int> myset2 = { 15,14,13,12,11 };
	vector<int>::iterator position= std::find(myset2.begin(), myset2.end(),13);
	std::cout << "current position at: " << *position << std::endl;
	std::cout << "ddddddddddddddddddddd insert_iterator ddddddddddddddddddddd" << std::endl;

	std::insert_iterator<vector<int>> i_itr(myset2, position);//cannot use const_iterator
	std::copy(myset1.begin(), myset1.end(), i_itr);// myset1 is inserted into myset2 before position of 13

	std::for_each(myset2.begin(), myset2.end(), [](int each) {
		
		std::cout << each << std::endl;
	});
	std::cout << "ddddddddddddddddddddd back_insert_iterator ddddddddddddddddddddddd" << std::endl;
	std::back_insert_iterator<vector<int>> i_itrq(myset1);//insert elements at back of myset1, cannot use const_iterator
	std::copy(myset2.begin(), myset2.end(), i_itrq);// myset1 is inserted into myset2 before position of 13
	std::for_each(myset1.begin(), myset1.end(), [](int each) {
		std::cout << each << std::endl;
	});
	std::cout << "ddddddddddddddddddddd front_insert_iterator ddddddddddddddddddddddd" << std::endl;
	//no push_front() in vector=> cannot work with front_insert_iterator for vector below code will not work
	
	//std::front_insert_iterator<vector<int>> i_itrq1(myset2);//insert elements at front of myset1, cannot use const_iterator
	//std::copy(myset1.begin(), myset1.end(), i_itrq1);// myset1 is inserted into myset2 before position of 13
	//std::for_each(myset2.begin(), myset2.end(), [](int each) {
	//	std::cout << each << std::endl;
	//});
	std::cout << "xxxxxxx for deque xxxxxxxx" << std::endl;

	deque<int> mydset1 = { 1,2,3,4,5 };
	deque<int> mydset2 = { 15,14,13,12,11 };
	std::front_insert_iterator<deque<int>> i_itrq1(mydset2);//insert elements at front of myset1, cannot use const_iterator
	std::copy(mydset1.begin(), mydset1.end(), i_itrq1);// myset1 is inserted into myset2 before position of 13
	std::for_each(mydset2.begin(), mydset2.end(), [](int each) {
		std::cout << each << std::endl;
	});
	std::cout << "xxxxxxx for list xxxxxxxx" << std::endl;
	list<int> mylset1 = { 1,2,3,4,5 };
	list<int> mylset2 = { 15,14,13,12,11 };
	std::front_insert_iterator<list<int>> i_itrql1(mylset2);//insert elements at front of myset1, cannot use const_iterator
	std::copy(mylset1.begin(), mylset1.end(), i_itrql1);// myset1 is inserted into myset2 before position of 13
	std::for_each(mylset2.begin(), mylset2.end(), [](int each) {
		std::cout << each << std::endl;
	});
	// 2. stream iterator
	//std::cout << "xxxxxxx111111111111111111111111111111111 xxxxxxxx" << std::endl;

	//vector <char>vec1;
	//copy(std::istream_iterator<char>(std::cin), std::istream_iterator<char>(), std::back_inserter(vec1));// default constructor of istream indicate end of istream, command line input insert into vector

	//copy(vec1.begin(), vec1.end(), std::ostream_iterator<char>(std::cout," "));// sent vector element to output stream to print
	//std::cout << "xxxxxxxwwwww33333333333333333333333 xxxxxxxx" << std::endl;

	//copy(std::istream_iterator<char>(std::cin), std::istream_iterator<char>(), std::ostream_iterator<char>(std::cout, " "));//collect commandline inputs, send to ouput stream to print
	std::cout << "xxxxxxxwwwwwww4444444444444444444444444444 xxxxxxxx" << std::endl;

	// 3. reverse iterator
	// use reverse interator read from backwards
	std::reverse_iterator<deque<int>::iterator> rset1;
	for (rset1 = mydset1.rbegin(); rset1 != mydset1.rend(); rset1++) {
		std::cout << *rset1 << std::endl;

	}
	// 4. move iterator (c++ 11)
	// *********************************Algorithms: mostly loops********************************
	vector <int> v1 = { 4,3,2,12,4,5,1 };
	vector <int>::iterator v1i = min_element(v1.begin(), v1.end());
	std::cout << "least: " << *v1i << std::endl;
	//Note 1: algorithm always process ranges in a half-open way:[begin, end)
	vector <int> v1x = { 4,3,2,1,12,4,5 };
	vector <int>::iterator v1ix = min_element(v1x.begin(), v1x.end());

	std::sort(v1x.begin(), v1ix);//use v1.end() instead pointer to last value
	std::for_each(v1x.begin(), v1x.end(), [](int each) {
		std::cout << each << std::endl;
	});
	std::cout << "xxxxxxxwwwwwww4444444444444444444444444444 xxxxxxxx" << std::endl;

	std::reverse(v1ix, v1x.end());//use v1.end() instead pointer to last value
	std::for_each(v1x.begin(), v1x.end(), [](int each) {
		std::cout << each << std::endl;
	});
	//Note 2:
	vector <int> vec2dsf(3);
	copy(v1i, v1.end(),//source
		vec2dsf.begin());//destination //need at least many space as source otherwise undefined behaviour
	
	for (auto v21 = vec2dsf.begin(); v21 != vec2dsf.end(); v21++) {
		std::cout << *v21 << std::endl;

	}
	//Note 3:
	vector <int> vecx3;
	copy(v1i, v1.end(),//insert instead overwrite
		back_inserter(vecx3));//return a back_insert_iterator to insert whch is not efficient but safe
	vecx3.insert(vecx3.end(), v1i, v1.end());// safe and efficient comapre with copy(v1i, v1.end(),	back_inserter(vecx3))
	//Note 4: algorithm with function
	vector  <int>vec44 = {2,4,5,3,6,7};
	vector<int>::iterator itfsdf = std::find_if(vec44.begin(), vec44.end(), isodd);
	//Note 5: algorithm with native c++ array
	int arr[5] = { 5,6,8,7,4 };
	sort(arr, arr + 4);

}*/
/*********************************** 5. c++ Function Object ( Functors ) ***********************************
// benifit of functor:
// 1. do more than regular fucntion, smart function: capabilities beyond operator()
//    it remembers state
// 2, it can have its own type

#include<vector>
#include<iostream>
#include<algorithm>
#include <functional>
#include<set>
#include<iterator>
#include<deque>
void cumulator(int p) {
	std::cout<< p*p<<std::endl;
}

template<int val>
//but template parameter is resolved during compile time, it is compile time constant
void cumulator2(int p) {
	std::cout << val*p << std::endl;
}
int val2 = 188;
void cumulator3(int p) {
	//using global variable is a nested coding practice
	std::cout << val2*p << std::endl;
}
void cumulator5(int a, int b) {
	std::cout << a*b << std::endl;
}

class x {
public:
	x() = default;
	// parameterized function
	x(int i) {
	}
	void operator()(std::string str) {// make class behaviour like function, it is not a type conversdion fucntion
		std::cout << "new x is born and say: " << str << std::endl;
	}
	//std::string operator()(std::string str) {// make class behaviour like function, it is not a type conversdion fucntion
	//	std::cout << "call funtor x with parameter" << str << std::endl;
	//	return str;
	//}
	operator std::string() const{//type conversion function
		return "X";
	}
};
class cumulator6s {
    int i,x;
public:
	cumulator6s() = default;
	cumulator6s(int i, int x):i(i),x(x)  {}
	void operator()() {
		std::cout << i * x << std::endl;
	}
};
class cumulator4 {
	int val;
public:

	cumulator4(int j) :val(j) {}
	void operator()(int i){
		std::cout << i * val << std::endl;
	}
};
double pows(double x, double y) {
	return std::pow(x,y);
}
bool needcopy(int x) {
	return (x>20) || (x<5);
}
class lsb_less {
public:
	bool operator()(int a, int b) {
		return (a % 10) < (b % 10);
	}
};
class needcopypredicate {
public:
	bool operator()(int x){
		return (x>20) || (x<5);
	}
};
int main() {
	x foo;
	foo("Hi"); // call functor with parameter "Hi"  
	x(8)("Welcome");
	std::vector<int> acumulators = { 1,2,3,4,5,6 };
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::for_each(acumulators.begin(), acumulators.end(), cumulator);
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::for_each(acumulators.begin(), acumulators.end(), cumulator2<100>);
	int i = 13;
	//std::for_each(acumulators.begin(), acumulators.end(), cumulator2<i>);// not compile, i is not compile time const

	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::for_each(acumulators.begin(), acumulators.end(), cumulator3);
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;
	std::for_each(acumulators.begin(), acumulators.end(), cumulator4(17));
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::for_each(acumulators.begin(), acumulators.end(), [](int each) {
		std::cout << "each: "<<each<<std::endl;
	});

	// *************************** STL build in functors ******************************
	//less greater greater_equal less_equal not_equal_to logical_and logical_not logical_or multiplies minus plus divide modulus negate
	int x = std::multiplies<int>()(3,5);
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::cout << x << std::endl;
	if (std::not_equal_to<int>()(3, 5)) {
		std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

		std::cout << "3!=5" << std::endl;

	}
	// *************************** Parameter Binding ******************************
	std::set<int>myset = { 1,2,3,4,5 };
	std::vector<int>myvec;
	int x1 = std::multiplies<int>() (3, 4);
	std::transform(myset.begin(), myset.end(), std::back_inserter(myvec), [](int each)->int {
		return each * 258;
	});
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::for_each(myvec.begin(), myvec.end(), [](int each)->void {
		std::cout << "myvec each: " << each << std::endl;
	});
	// c++ 11 feature :: std::bind()
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;

	std::transform(myset.begin(), myset.end(), std::back_inserter(myvec), std::bind(std::multiplies<int>(), std::placeholders::_1, 15));
	std::for_each(myvec.begin(), myvec.end(), [](int each)->void {
		std::cout << "myvec each: " << each << std::endl;
	});
	std::cout << "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" << std::endl;
	std::for_each(myvec.begin(), myvec.end(),std::bind(cumulator5, std::placeholders::_1,1244));
	std::cout << "&&&&&&&&&&&&&&&&&& std::bind1st &&&&&&&&&&&&&&" << std::endl;

	// c++ 03 feature :: std::bind1st() td::bind2nd()  work with function object
	// std::for_each(myvec.begin(), myvec.end(), std::bind(cumulator6s(),12));
	// how to user bind1st and bind2nd with self defined function object
	// *************************** convert regular function into functor ******************************
	std::set<int> mysetx = {3,1,25,7,12};
	std::deque<int>dsd;
	 auto f = std::function<double(double, double)>(pows);
	 std::cout << "&&&&&&&&&&&&&&&&&& convert function to functor &&&&&&&&&&&&&&" << std::endl;

	 //std::transform(mysetx.begin(), mysetx.end(), std::back_inserter (dsd),std::bind(f, std::placeholders::_1, 2));
	 std::for_each(mysetx.begin(), mysetx.end(), [](int each)->void {
		 std::cout << "dsd each: " << each << std::endl;
	 });
	 //when x>20||x<5 copy from myset to d
	 //less greater greater_equal less_equal not_equal_to logical_and logical_not logical_or multiplies minus plus divide modulus negate
	 //std::transform(mysetx.begin(), mysetx.end(), std::back_inserter(dsd), std::bind(std::greater<int>(), std::placeholders::_1, 20));
	 //std::transform(mysetx.begin(), mysetx.end(), std::back_inserter(dsd), std::bind(std::less<int>(), std::placeholders::_1, 5));
	 std::cout << "&&&&&&&&&&&&&&&&&& convert function to functor &&&&&&&&&&&&&&" << std::endl;

	 std::copy_if(mysetx.begin(), mysetx.end(), std::back_inserter(dsd),
		 std::bind(std::logical_or<int>(), std::bind(std::greater<int>(), std::placeholders::_1, 20), std::bind(std::less<int>(), std::placeholders::_1, 5)));
	 std::for_each(dsd.begin(), dsd.end(), [](int each)->void {
		 std::cout << "dsd each: " << each << std::endl;
	 });
	 std::cout << "&&&&&&&&&&&&&&&&&& needcopy &&&&&&&&&&&&&&" << std::endl;
	 std::copy_if(mysetx.begin(), mysetx.end(), std::back_inserter(dsd),
		 needcopy);
	 std::for_each(dsd.begin(), dsd.end(), [](int each)->void {
		 std::cout << "dsd each: " << each << std::endl;
	 });
	 std::cout << "&&&&&&&&&&&&&&&&&& lambda function &&&&&&&&&&&&&&" << std::endl;
	 std::copy_if(mysetx.begin(), mysetx.end(), std::back_inserter(dsd),
		 [](int x) { return (x>20) || (x<5);
	 });
	 std::for_each(dsd.begin(), dsd.end(), [](int each)->void {
		 std::cout << "dsd each: " << each << std::endl;
	 });
	 // *************************** why need functor in STL ******************************
	 std::set<int> mysetx1xzx = { 3,1,25,7,12 };
	 std::set<int, std::less<int>> mysetx1 = { 3,1,25,7,12 };//less is default value for order fucntor in set

	 std::set<int, lsb_less> mysetx12 = { 3,1,25,7,12 };
	 std::cout << "&&&&&&&&&&&&&&&&&& functor function &&&&&&&&&&&&&&" << std::endl;

	 std::for_each(mysetx12.begin(), mysetx12.end(), [](int each)->void {
		 std::cout << "mysetx12 each: " << each << std::endl;
	 });
	 // *************************** Predicate ******************************
	 // A functor return bool but not modify data
	 std::cout << "&&&&&&&&&&&&&&&&&& functor function &&&&&&&&&&&&&&" << std::endl;
	 std::vector<int>asdfasdfas;
	 std::copy_if(mysetx1xzx.begin(), mysetx1xzx.end(), std::back_inserter(asdfasdfas), needcopypredicate());
	 std::for_each(asdfasdfas.begin(), asdfasdfas.end(), [](int each)->void {
		 std::cout << "asdfasdfas each: " << each << std::endl;
	 });
	 //predicate should only be used for comparison or condition check
}*/
/*********************************** 5. c++ STL algorithm work through: Non-Modifying Algorithm***********************************
//   e.g. count, min and max, compare, linear search, attribute
#include<vector>
#include<algorithm>
#include <functional>
#include<set>
#include<iterator>
#include<deque>
bool lessthan10(int x) {
	return x < 10;
}
int main() {
	// C++ 11 lambda function
	std::vector<int> vec = { 9,80,60,32,32,5,67,7,53,55 };
	std::vector<int> vec2 = { 9,80,60,32,21,5,67,7,53,55 };

	int num = std::count_if(vec.begin(), vec.end(), [](int x) {
		return x < 10;
	});
	std::cout << num << std::endl;
	int num2 = std::count_if(vec.begin(), vec.end(), lessthan10);
	std::cout << num2 << std::endl;
	std::vector<int>::iterator itr, itr2;
	std::pair<std::vector<int>::iterator, std::vector<int>::iterator>pair_of_itr;
	// C++ 03: some algorithm can be found in tri and boost
	// 1 Counting
	//   Algorithm    Data    Operation
	int n = std::count(vec.begin(), vec.end(), 5);
	std::cout << n << std::endl;
	int n2= std::count_if(vec.begin(), vec.end(), [](int x) {
		return x < 10;
	});
	std::cout << n2 << std::endl;
	// 2 Min and Max
	auto itraa = std::max_element(vec.begin(),vec.end());
	std::cout << *itraa << std::endl;
	auto itraaa = std::max_element(vec.begin(), vec.end(), [](int x,int y) {// return first max
		return x % 10 < y % 10;
	});
	std::cout << *itraaa << std::endl;

	auto itraaaa = std::min_element(vec.begin(), vec.end());               // return first min
	std::cout << *itraaaa << std::endl;
	auto itraaaaaa = std::min_element(vec.begin(), vec.end(), [](int x, int y) {
		return x % 10 > y % 10;
	});
	std::cout << *itraaaaaa << std::endl;
	std::pair<std::vector<int>::iterator, std::vector<int>::iterator> itraaaaaaa = std::minmax_element(vec.begin(), vec.end(), [](int x, int y) {
		return x % 10 < y % 10;                                           // return a pair includes first min and last max
	});

	std::cout << *itraaaaaaa.first<<":"<< *itraaaaaaa.second
		<< std::endl;
	// 3 linear search
	std::cout << " ((((((((((((((((((((((((( find -> linear search )))))))))))))))))))))))))))" << std::endl;

	auto ls1 = std::find(vec.begin(), vec.end(), 32);
	std::cout << *ls1 << std::endl;	
	
	std::cout << " ((((((((((((((((((((((((( find if -> linear search find first match )))))))))))))))))))))))))))" << std::endl;
	auto ls3 = std::find_if(vec.begin(), vec.end(), [](int x) {
		return x > 60;
	});
	std::cout << *ls3 << std::endl;

	std::cout << " ((((((((((((((((((((((((( find if not-> linear search find first not match )))))))))))))))))))))))))))" << std::endl;
	auto ls4 = std::find_if_not(vec.begin(), vec.end(), [](int x) {
		return x >10;
	});
	std::cout << *ls4 << std::endl;
	std::cout << " ((((((((((((((((((((((((( search n-> linear search find first not match )))))))))))))))))))))))))))" << std::endl;
	auto ls5 = std::search_n(vec.begin(), vec.end(), 1, 60);// find first substring start with 60
	for (auto a = ls5; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( search subrange )))))))))))))))))))))))))))" << std::endl;
	auto ls6 = std::search(vec.begin(), vec.end(), vec2.begin(), vec2.end());// find first substring start with vec2
	for (auto a = ls6; a != vec.end();a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( search subrange:find end )))))))))))))))))))))))))))" << std::endl;

	auto ls7 = std::find_end(vec.begin(), vec.end(), vec2.begin(), vec2.end());// find last substring start with vec2
	for (auto a = ls7; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	//generalized form: search(), find_end();
	std::cout << " ((((((((((((((((((((((((( search any_of )))))))))))))))))))))))))))" << std::endl;
	auto ls8 = std::find_first_of(vec.begin(), vec.end(), vec2.begin(), vec2.end());// find any from vec2 in vec
	for (auto a = ls8; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	auto ls9 = std::find_first_of(vec.begin(), vec.end(), vec2.begin(), vec2.end(), // find any from vec2 in vec
		[](int x, int y) {
		    return x == y * 4;
	    });
	std::cout << " ((((((((((((((((((((((((( search any_of: x=y*4 )))))))))))))))))))))))))))" << std::endl;

	for (auto a = ls9; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( adjacent_find )))))))))))))))))))))))))))" << std::endl;
	auto ls10 = std::adjacent_find(vec.begin(), vec.end());// find two adjacent items are same
	for (auto a = ls10; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( adjacent_find )))))))))))))))))))))))))))" << std::endl;
	auto ls11 = std::adjacent_find(vec.begin(), vec.end(), [](int x, int y) {
		return x == y * 4;
	});// find two adjacent items are match x==y*4
	for (auto a = ls11; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}

	// 4 compare range
	std::cout << " ((((((((((((((((((((((((( compare:equal )))))))))))))))))))))))))))" << std::endl;

	if (std::equal(vec.begin(),vec.end(),vec2.begin())) {// equal no length check, different size return exception
		std::cout << "same" << std::endl;

	} else {
		std::cout << "not same" << std::endl;

	}
	std::cout << " ((((((((((((((((((((((((( compare:isPermutation )))))))))))))))))))))))))))" << std::endl;
	if (std::is_permutation(vec.begin(), vec.end(), vec2.begin())) {// equal no length check, different size return exception
		std::cout << "vec and vec2 hav the same items but in different order" << std::endl;

	}
	else {
		std::cout << "vec and vec2 not permutation" << std::endl;

	}
	std::cout << " ((((((((((((((((((((((((( compare:mismatch )))))))))))))))))))))))))))" << std::endl;
	auto pairofit = std::mismatch(vec.begin(), vec.end(), vec2.begin());// find first difference, pair_of_itr.first is an iterator of vec, pair_of_itr.second is an iterator of vec2
	for (auto a = pairofit.first; a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " (((((((((((((((((((((((((  )))))))))))))))))))))))))))" << std::endl;

	for (auto a = pairofit.second; a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( compare: lexicographical_compare )))))))))))))))))))))))))))" << std::endl;
	auto pairsdofit = std::lexicographical_compare(vec.begin(), vec.end(), vec2.begin(), vec2.end());
	std::cout << pairsdofit << std::endl;
	// equal(), is_permutation(), mismatch(), lexicographical_compare()
	// 5. Check Attributes
	std::cout << " ((((((((((((((((((((((((( Check Attributes: is_sorted )))))))))))))))))))))))))))" << std::endl;

	std::cout<<std::is_sorted(vec.begin(), vec.end())<<std::endl;// checkout if container is sorted
	std::cout << " ((((((((((((((((((((((((( Check Attributes: is_sorted_until )))))))))))))))))))))))))))" << std::endl;

	auto itee= std::is_sorted_until(vec.begin(), vec.end()) ;
	std::cout << *itee << std::endl;// checkout if container is sorted
	std::cout << " ((((((((((((((((((((((((( Check Attributes: is_partitioned )))))))))))))))))))))))))))" << std::endl;
	auto itee1= std::is_partitioned(vec.begin(), vec.end(), [](int x) {
		return x > 80;
	});
	std::cout << itee1 << std::endl;
	std::cout << " ((((((((((((((((((((((((( Check Attributes: is_heap )))))))))))))))))))))))))))" << std::endl;
	std::cout << std::is_heap(vec.begin(),vec.end()) << std::endl;
	std::cout << " ((((((((((((((((((((((((( Check Attributes: is_heap_until )))))))))))))))))))))))))))" << std::endl;
	auto sdi = std::is_heap_until(vec.begin(), vec.end());
	for (auto x = sdi; x != vec.end();x++) {
		std::cout << *x << std::endl;

	}
	std::cout << " ((((((((((((((((((((((((( ALL  )))))))))))))))))))))))))))" << std::endl;
	auto all_of = std::all_of(vec.begin(), vec.end(), [](int x) {
		return x > 40;
	});
	std::cout << all_of << std::endl;

	std::cout << " ((((((((((((((((((((((((( any )))))))))))))))))))))))))))" << std::endl;
	auto any=std::any_of(vec.begin(), vec.end(), [](int x) {
		return x > 40;
	});	std::cout << any << std::endl;

	std::cout << " ((((((((((((((((((((((((( none )))))))))))))))))))))))))))" << std::endl;
	auto none = std::none_of(vec.begin(), vec.end(), [](int x) {
		return x > 40;
	});	std::cout << none << std::endl;

}*/
/*********************************** 5. c++ STL algorithm work through: Value-changing Algorithm***********************************
// value-changing algorithm - changes the element values
// copy, move, transform, swap, fill, replace, remove
#include<vector>
#include<algorithm>
int main() {
	std::vector<int> vec = { 9,80,60,32,32,5,67 };// 7 items
	std::vector<int> vec5 = { 9,80,60,32,32,5,67 };// 7 items

	std::vector<int> vec2 = { 0,0,0,0,0,0,0,0,0,0 };// 10 items
	std::vector<int>::iterator tir, tir2;
	std::pair<std::vector<int>::iterator, std::vector<int>::iterator> pair_of_itrs;
	std::cout << " ((((((((((((((((((((((((( copy() )))))))))))))))))))))))))))" << std::endl;

	//std::copy(vec.begin(), vec.end(), vec2.begin());
	for (auto a = vec2.begin(); a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( copy_if() )))))))))))))))))))))))))))" << std::endl;
	//std::copy_if(vec.begin(), vec.end(), vec2.begin(), [](int i) {
	//	return i > 30;
	//});
	for (auto a = vec2.begin(); a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( copy_n() )))))))))))))))))))))))))))" << std::endl;
	//std::copy_n(vec.begin(), 5, vec2.begin());
	for (auto a = vec2.begin(); a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( copy_backward() )))))))))))))))))))))))))))" << std::endl;
	//std::copy_backward(vec.begin(), vec.end(), vec2.end());
	for (auto a = vec2.begin(); a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( move(vec, vec2) )))))))))))))))))))))))))))" << std::endl;
	// if move semantics are defined for the element type, elements are moved over, 
	// otherwise they are copied over with copy constructor like copy()
	std::cout << " -----------------------------move integer--------------------------- " << std::endl;

	std::cout << " -----------------------------vec------------------------------- " << std::endl;

	//std::move(vec.begin(), vec.end(), vec2.begin());// vec2.length > vec.length
	for (auto a = vec.begin(); a != vec.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " -----------------------------vec2---------------------------------- " << std::endl;
	for (auto a = vec2.begin(); a != vec2.end(); a++) {
		std::cout << *a << std::endl;
	}
	std::cout << " -----------------------------move string--------------------------- " << std::endl;
	std::vector<std::string> vec3 = { "adf","adsf","as","d","sdf","sdf" };// 6 items
	std::vector<std::string> vec4 = { "","","","","","","","","","" };// 10 items

	std::cout << " -----------------------------vec------------------------------- " << std::endl;

	//std::move(vec3.begin(), vec3.end(), vec4.begin());// vec2.length > vec.length
	for (auto a :vec3) {
		std::cout << a << std::endl;
	}
	std::cout << " -----------------------------vec2---------------------------------- " << std::endl;
	for (auto ab :vec4) {
		std::cout << ab << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( move_backfard(vec, vec2) )))))))))))))))))))))))))))" << std::endl;
	std::cout << " -----------------------------vec------------------------------- " << std::endl;

	std::move_backward(vec3.begin(), vec3.end(), vec4.end());// vec2.length > vec.length
	for (auto a : vec3) {
		std::cout << a << std::endl;
	}
	std::cout << " -----------------------------vec2---------------------------------- " << std::endl;
	for (auto ab : vec4) {
		std::cout << ab << std::endl;
	}
	std::cout << " ((((((((((((((((((((((((( transform(vec, vec2, operation) )))))))))))))))))))))))))))" << std::endl;
}*/
/*********************************** 5. c++ STL algorithm work through: Sorting Algorithm***********************************
// Sorting requires random access iterator
#include<vector>
#include<algorithm>
#include<iterator>
#include<functional>
bool less_than(int a, int b) {
	return a > b;
}
bool lessThan10(int i) {
	return i < 10;
}
int main() {
	// std::sort() only sort vector, deque, container array, native array who has random access iterator
	std::vector<int> intvec = { 1,3,4,5,6,23,54,67,85,4,3,3 };
	std::vector<int>::iterator randomItr;
	std::cout << " ----------------------------- sort defalut ---------------------------------- " << std::endl;
	std::sort(intvec.begin(), intvec.end());
	for (auto each: intvec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- sort with function less_than() ---------------------------------- " << std::endl;
	std::sort(intvec.begin(), intvec.end(),less_than);
	for (auto each : intvec) {
		std::cout << "each element: " << each << std::endl;
	}
	// sometime we dont need complete sorting
	// problem 1 finding top 5 students according to their test scores
	// partial_sort
	std::cout << " ----------------------------- partial sort with std::greater ---------------------------------- " << std::endl;
	//std::partial_sort(intvec.begin(), intvec.begin()+5, intvec.end(), std::greater<int>());
	for (auto each : intvec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- partial sort defalut ---------------------------------- " << std::endl;
	//std::partial_sort(intvec.begin(), intvec.begin() + 5, intvec.end());
	for (auto each : intvec) {
		std::cout << "each element: " << each << std::endl;
	}
	// problem #2: Finding top 5 students according to their score, but i dont care the order
	std::vector<int>veec = {9,60,70,8,45,87,90,69,69,55,7};
	std::cout << " ----------------------------- Get the biggest 5 elements:std::nth_element() ---------------------------------- " << std::endl;
	//std::nth_element(veec.begin(), veec.begin()+5, veec.end(), std::greater<int>());
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	// problem 3: move students score lessthan 10 to front
	std::cout << " ----------------------------- retain previous order: std::stable_partition() ---------------------------------- " << std::endl;
	//std::stable_partition(veec.begin(), veec.end(), lessThan10);
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::partition() ---------------------------------- " << std::endl;
	//std::partition(veec.begin(),veec.end(), lessThan10);
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	// Heap Algorithm
	// 1. First element is always the largest
	// 2. Add/remove takes O(log(n)) time
	// 3. heap algorithm often used to implement priority queue which first element is always the largest
	std::cout << " ----------------------------- std::make_heap() ---------------------------------- " << std::endl;//veec
	std::make_heap(veec.begin(), veec.end());
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	// remove largest one in heap
	std::cout << " ----------------------------- std::pop_heap():---------------------------------- " << std::endl;//veec
	// perform 2 steps:
	// 1. swap vec[0] with last item vec[size-1]
	// 2. heapify [vec.begin(), vec.end()-1)
	std::pop_heap(veec.begin(), veec.end());
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- veec.pop_back() to remove largest ---------------------------------- " << std::endl;//veec
	veec.pop_back();
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- veec.push_heap() to add new element ---------------------------------- " << std::endl;//veec
	
	std::cout << " ----------------------------- push new to heap ---------------------------------- " << std::endl;//veec
	veec.push_back(100);
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- then heapify new element ---------------------------------- " << std::endl;//veec

	std::push_heap(veec.begin(), veec.end());
	for (auto each : veec) {
		std::cout << "each element: " << each << std::endl;
	}
	// heap sorting
	std::cout << " ----------------------------- std::sort_heap() ---------------------------------- " << std::endl;//veec

	std::vector<int>vec = { 9,1,10,2,45,3,90,4,9,5,8 };
	std::make_heap(vec.begin(), vec.end());
	std::sort_heap(vec.begin(), vec.end());
	// only work on heap, vec has to be heapify first
	for (auto each : vec) {
		std::cout << "each element: " << each << std::endl;
	}
		
}*/

/*********************************** 5. c++ STL algorithm work through: Sorted Data Algorithms and Numeric Algorithms **********************************
#include<vector>
#include<algorithm>
#include<iterator>
#include<functional>
#include<numeric>
int main() {
	// <1. Sorted Data Algorithms
	// - Algorithm that require data being pre-sorted
	// - Binary search, merge, set operations
	// Note: every sorted data algorithn has a generalized form with a same name
	std::cout << " ----------------------------- Binary_search ---------------------------------- " << std::endl;//veec
	// 1. search elements
	std::vector<int>vec = { 9,9,9,9,10,45,66,90 };
	bool found=std::binary_search(vec.begin(), vec.end(), 4);
	std::cout << "find 4 result: " << found << std::endl;
	std::vector<int>vecs = { 9,45,90 };
	std::cout << " ----------------------------- include ---------------------------------- " << std::endl;//veec
	// return true is all elements of s is included in vec
	// both s and vec must be sorted
	bool found1 = std::includes(vec.begin(), vec.end(),vecs.begin(), vecs.end());
	std::cout << "if s is included in vec: " << found1 << std::endl;
	std::cout << " ----------------------------- Searh position: std::lower_bound()|std::upper_bound()|std::equal_range() ---------------------------------- " << std::endl;//veec
	// Search position
	auto itr = std::lower_bound(vec.begin(), vec.end(),10);
	std::cout << "find lower bound " << *itr << std::endl;
	auto itr1 = std::upper_bound(vec.begin(), vec.end(), 10);
	std::cout << "find upper bound " << *itr1 << std::endl;
	auto pair_iter = std::equal_range(vec.begin(), vec.end(), 10);
	std::cout << "find pair range: " << *pair_iter.first << " : " << *pair_iter.second << std::endl;
	// find position 9 can be 
	// 2. merge: merge two ranges of sorted data
	std::cout << " ----------------------------- std::Merge() ---------------------------------- " << std::endl;//veec
	// note: both vec1 and vec2 should be sorted, the same for set operation
	// nothing should be dropped, all duplicates are kept
	std::vector<int>vec1s = {8,9};
	std::vector<int>vec2s = { 7,9,11,60 };
	std::vector<int>vec_out(10);
	std::merge(vec1s.begin(), vec1s.end(), vec2s.begin(), vec2s.end(),vec_out.begin());
	for (auto each : vec_out) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::inplace_merge() ---------------------------------- " << std::endl;//veec
	std::vector<int>vec1 = { 8,9,9,60,8,9,9,60 ,62};
	std::inplace_merge(vec1.begin(), vec1.begin() + 4, vec1.end());//(begin, mid, last)
	for (auto each : vec1) {
		std::cout << "each element: " << each << std::endl;
	}
	// 3. set operations
	//    - Both vecx and vecx3 should be should sorted
	//    - the resulted data is also sorted
	std::vector<int>vecx = { 8,9,9,10 };
	std::vector<int>vecx3 = {7,9,10 };
	std::vector<int>vec_outx(5);	
	std::vector<int>vec_outx1(5);

	std::cout << " ----------------------------- std::set_union() ---------------------------------- " << std::endl;//veec
	//std::set_union(vecx.begin(), vecx.end(), vecx3.begin(), vecx3.end(), vec_outx.begin());
	// if x is in both vecx and vecx3, only one x => vec_outx // return all elements in two vector no duplicates
	for (auto each : vec_outx) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::set_intersection() ---------------------------------- " << std::endl;//veec
	//std::set_intersection(vecx.begin(), vecx.end(), vecx3.begin(), vecx3.end(), vec_outx1.begin());
	// if x is in both vecx and vecx3, all x => vec_outx // return  elements exist in both vectors 
	for (auto each : vec_outx1) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::set_difference() ---------------------------------- " << std::endl;//veec
	//only the items that are in vecx but not in vecx3 are saved in vec_out
	std::set_difference(vecx.begin(), vecx.end(), vecx3.begin(), vecx3.end(), vec_outx.begin());
	for (auto each : vec_outx) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::set_symmetric_difference() ---------------------------------- " << std::endl;//veec
	//has items in either vecx or vecx3 are saved in vec_outx1
	std::set_symmetric_difference(vecx.begin(), vecx.end(), vecx3.begin(), vecx3.end(), vec_outx1.begin());
	for (auto each : vec_outx1) {
		std::cout << "each element: " << each << std::endl;
	}
	// <2. Numeric Algorithms<numeric>
	//     - Accumulate, inner product, partial sum, adjacent difference
	// 1. accumulate
	std::vector<int>vecn = { 8,1,9,9,10 };
	std::vector<int>vecn1 = { 8,1,9,9,10 };

	std::cout << " ----------------------------- std::accumulate() ---------------------------------- " << std::endl;//veec
	int x = std::accumulate(vecn.begin(), vecn.end(),1);
	std::cout << "result: " << x << std::endl;
	std::cout << " ----------------------------- std::accumulate() with multiplies ---------------------------------- " << std::endl;//veec
	int xq = std::accumulate(vecn.begin(), vecn.end(), 1,std::multiplies<int>());
	std::cout << "result: " << xq << std::endl;
	// 2. inner product
	std::cout << " ----------------------------- std::inter_product() ---------------------------------- " << std::endl;//veec

	int xq1 = std::inner_product(vecn.begin(), vecn.begin() + 3, vecn.end()-3,10);
	//  => 10 + vec[0]*vec[4] + vec[2]*vec[5] + vec[3]*vec[6]
	std::cout << "result: " << xq1 << std::endl;
	std::cout << " ----------------------------- std::inter_product() with functor ---------------------------------- " << std::endl;//veec

	int xq2= std::inner_product(vecn.begin(), vecn.begin() + 3, vecn.end()-3, 10,std::multiplies<int>(),std::plus<int>());
	std::cout << "result: " << xq2 << std::endl;
	//   => 10 * ( vec[0] + vec[4] )*( vec[2] + vec[5] )*( vec[3] + vec[6] )
	// 3. partial sum
	std::cout << " ----------------------------- std::partial_sum() ---------------------------------- " << std::endl;//veec

	std::partial_sum(vecn.begin(), vecn.end(), vecn1.begin());
	for (auto each : vecn) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " --------------------------------------------------------------- " << std::endl;//veec
	for (auto each : vecn1) {
		std::cout << "each element: " << each << std::endl;
	}
	// vecn1[0]=vecn[0]
	// vecn1[1]=vecn[0]+vecn[1]
	// vecn1[2]=vecn[0]+vecn[1]+vecn[1]
	// vecn1[3]=vecn[0]+vecn[1]+vecn[2]+vecn[3]
	// .....
	std::cout << " ----------------------------- std::partial_sum() with multiplies ---------------------------------- " << std::endl;//veec
	std::partial_sum(vecn.begin(), vecn.end(), vecn1.begin(), std::multiplies<int>());
	for (auto each : vecn) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " --------------------------------------------------------------- " << std::endl;//veec
	for (auto each : vecn1) {
		std::cout << "each element: " << each << std::endl;
	}
	// vecn1[0]=vecn[0]
	// vecn1[1]=vecn[0]*vecn[1]
	// vecn1[2]=vecn[0]*vecn[1]*vecn[1]
	// vecn1[3]=vecn[0]*vecn[1]*vecn[2]*vecn[3]
	// .....
	std::cout << " ----------------------------- std::adjacent_difference() ---------------------------------- " << std::endl;//veec

	// 3. adjacent difference
	std::adjacent_difference(vecn.begin(),vecn.end(), vecn1.begin());
	// vecn1[0]=vecn[0]
	// vecn1[1]=vecn[1]-vecn[0]
	// vecn1[2]=vecn[2]-vecn[1]
	// vecn1[3]=vecn[3]-vecn[2]
	// .....
	for (auto each : vecn1) {
		std::cout << "each element: " << each << std::endl;
	}
	std::cout << " ----------------------------- std::adjacent_difference() with plus() ---------------------------------- " << std::endl;//veec
	std::adjacent_difference(vecn.begin(), vecn.end(), vecn1.begin(), std::plus<int>());
	// vecn1[0]=vecn[0]
	// vecn1[1]=vecn[1]+vecn[0]
	// vecn1[2]=vecn[2]+vecn[1]
	// vecn1[3]=vecn[3]+vecn[2]
	// ....
	for (auto each : vecn1) {
		std::cout << "each element: " << each << std::endl;
	}
}*/
/*********************************** C++ String #1: Constructor and Size *********************************

#include<string>
int main() {
	// string constructor
	std::string s1("std");
	std::string s2("std library", 3);// 3 is length
	std::string s3("std library", 4, 7);// 4 is starting point, 7 is length
	std::string s4(s1, 2, 2);
	std::string s5(5, 'a');// string include 5 'a'
	std::string s6({'a','b','c'});
	std::cout << "s1" << s1 << " | s2: " << s2 << " | s3: " << s3 << " | s4: " << s4 << " | s5: " << s5 << " | s6: " << s6 << std::endl;

	// string size
	s1 = "goodbye";
	s1.size();
	s1.capacity();
	s1.reserve(100);// only work on capacity
	s1.reserve(5);// still goodbye size=7 capacity=7
	s1.shrink_to_fit();// resize to 7
	s1.resize(3);//size = 3
	s1.resize(9);// size=9 rest will be null characters=> \0\0\0\0
	s1.resize(12, 'x'); // goodbyexxxxx
	//access string

}*/
/*********************************** C++ String #2: Accessing String Characters ********************************

#include<string>
int main() {
	std::string s1("goodbye");
	s1[2];//o
	s1[2] = 'x';//goxdbye
	s1.at(2) = 'y';////goydbye
	s1.at(20) = 'y';////throw exception

	s1.front();//reference of first char
	s1.back();//reference of last char
	s1.begin();
	s1.end();
	s1.push_back('z');
	s1.pop_back();
	//no push front popfront
	//
	std::string s3(s1.begin(), s1.begin()+3);// goo
	//ranged access
	//assing, append, insert, replace
	std::string s22("dranglod land");
	s1.assign(s22);//s1=s2
	s1.assign(s22, 2, 4);//agon
	s1.assign("windson");//c string  as parameter
	s1.assign("winsdom",3);// c string as parameter
	//s1.assign(s22, 3);//error because s22 is not c string
	s1.assign(3, 'x');//s1 xxx
	s1.assign({'a','b','c'});//s1:abc
	s1.append(" def");
	s1.insert(2, "sdf");
	s1.replace(2, 5,s22,3,3);//start 2, size 5
	s1.erase(1, 4);
	s22.substr(2, 4);//start 2 size 4
	s1 = "abc";
	s1.c_str();// return c string "abc\0"
	s1.swap(s22); //swap two string
}*/
/*********************************** C++ Stream *********************************/
#include <fstream>

#include <bitset>
#include <complex>
#include <iomanip>
#include <iostream>
//redefine endl
std::ostream& endl(std::ostream& sm) { sm.put('\n'); sm.flush(); return sm; }
std::ostream& std::ostream::operator<<(std::ostream& (*func)(std::ostream&)) { return(*func)(*this); }
/********************************** Enable Streaming for Your Own Class  **************************************/
struct dog {
	int age_;
	std::string name_;
};
std::ostream& operator<<(std::ostream&sm, const dog& d) {
	sm << "my name is " << d.name_ << "and my age is : " << d.age_ << std::endl;
	return sm;
};
std::istream& operator >>(std::istream&sm,  dog& d) {
	sm >> d.age_;
	sm >> d.name_;
	return sm;
};
int main() {
	/**********************************#1: Introductory ***************************************
	//c++ input/output library
	//std::cout is global object ostream typeof std::basic_ostream<char> ostreamObj
	// << is member function of ostream : ostream &operator<<(std::string v){}
	// new line=> std::endl '\n'+flush
	// what is stream? serial I\O interface to external devices (file, stdin/stdout, network, etc)
	std::string s("hello");
	s[3] = 't';//random access
	//std::cout[3] = 't';//Error serial interface not random access
	{
	  std::ofstream ofs("test.txt");// open new file/ create new if not exist // file open when ofstream constructed
	  ofs << "experience is the mother of wisdom" << std::endl;//<< overload function for all stream library fundamental datatype
	  ofs << 234 << std::endl;
	  ofs << 2.3 << std::endl;
	  ofs << std::bitset<8>(14) << std::endl;//write 00001110 into file
	  ofs << std::complex<int>(2,3) << std::endl;//write (2,3) into file
	}// file close ofstream gose out scope=> typical RAII
	// IO operation:
	// 1. formatting the data <-----> communicating the data with external devices
	// 2. software engineer principle: low coupling => reusability
	*/
	/**********************************#2: file stream and error handling ***************************************
	{
		//std::ofstream ofs("test.txt");// open new file and clear content of file/ create new if not exist // file open when ofstream constructed
		std::ofstream ofs("test.txt", std::ofstream::app);//move output pointer to then end of file so it wont clean the content of file
		ofs << "honesty is the best policy." << std::endl;
	}
	{
		std::ofstream ofs("test.txt", std::ofstream::in | std::ofstream::out);// write something in middle of file
		ofs.seekp(10, std::ios::beg);//move output pointer 10 chars after begin
		ofs << "asdfasf";//overwrite 5 chars
		ofs.seekp(-5,std::ios::end);//move output pointer 10 chars before the end
		ofs << "Nothing ventured, nothing gained" <<std:: endl;
		ofs.seekp(-5, std::ios::cur);//move output pointer 10 chars before the current position
	}
	{
		std::ifstream inf("test.txt");// open file
		int i;
		inf >> i;//read i from file and save into integer i, it will fail if first word not interger
		// Error status: goodbit, badbit, failbit, eofbit
		inf.good();// everything is ok (goodbit==1)
		inf.bad();//non-recoverable error(badbit==1)
		inf.fail();//failed stream operation(failbit==1, badbit==1)
		inf.eof();//return end of file (eofbit==1)
		inf.clear();//clear all the error status = clear(ios::goodbit) goodbit=1, restbits=0
		inf.clear(std::ios::badbit);//set a new value to error flag=>badbit=1 bit operation everthing else 0
		inf.rdstate();//read current status flag
		inf.clear(inf.rdstate()& ~std::ios::failbit);//clear only the failbit
		if (inf)//- if (!inf.fail())
			std::cout << "read successfully" << std::endl;
		if(inf>>i) //return reference to stream
			std::cout << "read successfully" << std::endl;
		// handle error with exceptions
		inf.exceptions(std::ios::badbit|std::ios::failbit);//setting exception mask
		// when badbit or failbit set to 1, exception of ios::failure will be throw
		// when eofbit set to 1, not exception
		inf.exceptions(std::ios::goodbit);//not exception

	}*/
	/**********************************#3: formatted and unformatted I\O ***************************************
	std::cout << 34 << std::endl;//34
	std::cout.setf(std::ios::oct, std::ios::basefield);
	std::cout << 34 << std::endl;//42
	std::cout.setf(std::ios::showbase);
	std::cout << 34;//042
	std::cout.setf(std::ios::hex, std::ios::basefield);
	std::cout << 34;//0x22
	std::cout.unsetf( std::ios::showbase);
	std::cout << 34;//22
	std::cout.setf(std::ios::dec, std::ios::basefield);
	std::cout.width(10);
	std::cout << 26 <<std::endl;//           26 default alignment to right
	std::cout.setf(std::ios::left, std::ios::adjustfield); // 26
	//  floating point value
	std::cout.setf(std::ios::scientific, std::ios::floatfield);
	std::cout << 340.1 << std::endl;// 3.401000e+002
	std::cout.setf(std::ios::fixed, std::ios::floatfield);
	std::cout << 345.1 << std::endl;//340.100000
	std::cout.precision(3);
	std::cout << 345.1 << std::endl;//340.100
	int i;
	std::cin.setf(std::ios::hex, std::ios::basefield);
	std::cin >> i;//enter :12 //i=18

	std::ios::fmtflags f=std::cout.flags();
	std::cout.flags(std::ios::oct|std::ios::showbase);
	// member function for unformated I\O
	// input
	std::ifstream inf("mylog.txt");
	char buf[80];
	inf.get(buf, 80);// ready 80 chars and save to buf
	inf.getline(buf,80);// ( read 80 chars or meet \n ) and save to buf
	inf.read(buf,20);// read 20 chars
	inf.ignore(3);//ignore next 3 chars in stream
	inf.peek();//return chars on top of stream
	inf.unget();//return a char back to the stream
	inf.get();// return a char from stream
	inf.putback('z');// put a diffent char back to starem
	inf.gcount();//return the number of chars being read by last unformateed read
	//output
	std::ofstream of("mylog.txt");
	of.put('c');//put one char into stream
	of.write(buf,6);//write first 6 char inside buf into stream
	of.flush();//flush output
	*/
	/**********************************#4: Manipulators ***************************************
	std::cout << "hello" << std::endl;//endl // \n and flush
	//object? build in data type? function?
	// it is a function
	std::cout << std::ends;//'\0'
	std::cout << std::flush;
	std::cin >> std::ws;//read and discard white spaces
	std::cout << std::setw(8) << std::left << std::setfill('_') << 99 << std::endl;
	std::cout << std::hex << std::showbase << 14;//0xe
	*/
	/**********************************#5: Stream buffer ***************************************
	// I\O Operation:
	// Formatting data  -- stream
	// Communicating data to external devices  -- stream buffer
	std::cout << 35 << std::endl;
	std::streambuf* pbpuf=std::cout.rdbuf();
	std::ostream myCout(pbpuf);
	myCout << 34;//34
	myCout.setf(std::ios::showpos);
	//Mycout widht
	myCout.width(20);
	myCout << 12 << std::endl;//        +12
	std::cout << 12 << std::endl;//12
	std::ofstream ofds("mylog.txt");
	std::streambuf * origBuf = std::cout.rdbuf();
	std::cout.rdbuf(ofds.rdbuf());
	std::cout << "hello" << endl;
	//redirecting
	std::cout.rdbuf(origBuf);
	std::cout << "goodbuy" << std::endl;//std::out goodbuy
	std::istreambuf_iterator<char> ia(std::cin);
	std::ostreambuf_iterator<char> o(std::cout);
	while (*ia !='x') {
		*o = *ia;
		++o;
		++i;
	}
	std::copy(std::istreambuf_iterator<char>(std::cin),std::istreambuf_iterator<char>(), std::ostreambuf_iterator<char>(std::cout));
	*/
	/**********************************#6: String Stream  **************************************
	std::stringstream ss;// stream without IO operation
	//read/write of string=> treat string as file
	// good for code reuse to use stream format on string
	ss << 89 << " Hex:" << std::hex << 89 << "oct" << std::oct << 89;
	std::cout << ss.str() << std::endl;
	int a, b, c;
	std::string s1;
	ss >> std::hex >> a; // formated input works token by toke. spaces, tabs, newlines
	a = 137;

	ss >> s1;//s1:"hex: "
	ss >> std::dec >> b;//b=59
	ss.ignore(6);//ignore 6 characters
	ss >> std::oct >> c;//c=89
	std::ostringstream; //-- format output
	std::istringstream; //-- format intput
	*/
	/********************************** Enable Streaming for Your Own Class  **************************************/
dog d{ 2,"bob" };
std::cout << d;
std::cin >> d;
std::cout << d;
}

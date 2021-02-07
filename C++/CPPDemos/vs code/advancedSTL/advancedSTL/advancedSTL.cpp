// advancedSTL.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>
#include<unordered_set>
#include<algorithm>
#include<map>
#include<list>

using namespace std;

/*************************************************"Learn STL : Member Functions vs Algorithm Functions"*****************************************************
int main()
{
	//container member functions vs algorithms
	/// function with smae name
	// list:
	//template <typename T>
	//void remove(const T); template<class comp>void remove_if(comp);
	//void unique(); template<class comp>void unique(comp);
	//void sort(); template<class comp>void sort(comp);
	//void merge(list&); template<class comp> void merge(comp);
	//void reverse();
	// associative container:
	//std::string::size_type count(const T&) const;
	//iteraotr lower_bound(const T&)const;
	//iterator upper_bound(const T&)const;
	//pair<iterator, iterator>equal_range(const T&)const;
	// note: they dont have generalized form, because comparision is defined by the container
	// unordered container
	// size_type count(const T&) const;
	// iteraotr find(const T&);
	// pair<iteraotr, iteraotr>equal_range(const&T);
	// note: no generalized form; use hash function to search
	std::unordered_set<int>s = { 1,2,3,4,5,6 };
	unordered_set<int>::iterator itr;
	auto itr = s.find(4);                                                                     //o(1)win because of hash table
	auto itr = std::find(s.begin(), s.end(),4);                                               //o(n)
	map<char, std::string> a = { {'s',"sunday"},{ 't',"tuesday" },{ 'w',"wednesday" },{ 'f',"friday" } };
	auto itr = a.find('s');                                                                   //o(log(n))  winner=>more efficent only compare key
	auto itr = std::find(a.begin(), a.end(), make_pair('f',"friday"));                        //o(n)  double panelty compare key and value
	std::list<int>l = { 2,4,5,6,3,7,5 };
	l.remove(4);                                                                              //o(n) winer remove by reset pointer => {2,5,6,3,7,5}
	auto removeditr = std::remove(l.begin(), l.end(), 4); l.erase(removeditr);                //o(n)  remove member by copy => {2,5,6,3,7,5,5} => call erase to remove last one
	l.sort();                    //  
	std::sort(l.begin(),l.end());//undefined behaviour=> list (only bidirectional iterator)has no random access iterator provide to algorithm sort()
	// member function more efficient than algorithm fucntion

    return 0;
}*/
/*************************************************"Learn STL : tricky reverse iterator"*****************************************************

int main() {
	//two way declare reverse iterator
	std::reverse_iterator<std::vector<int>::iterator>ritr;
	vector<int>::reverse_iterator ritrds;
	vector<int>vec{ 1,2,3,45,5 };
	for (ritr = vec.rbegin(); ritr != vec.rend(); ++ritr) {
		cout << *ritr << endl;
	}
	//reverse iterator and regular iterator can converted to each other
	vector<int>::iterator iere;
	vector<int>::reverse_iterator ritrd = vector<int>::reverse_iterator(iere);
	//iere = vector<int>::iterator(ritrd);// only iterator=>reverse_iterator 
	iere = ritrd.base();                                                                       //base() return current iterator

	vector<int>::reverse_iterator adf = find(vec.rbegin(), vec.rend(),3);
	cout << *adf << endl;                 //3
	vector<int>::iterator asdf = adf.base();
	cout << *asdf << endl;                //45              reverse_iterator and iterator not pointing to same position
	vector<int>::reverse_iterator sdd = find(vec.rbegin(), vec.rend(), 3);
	//vec.insert(sdd,9);
	vec.insert(sdd.base(), 9);
	//vec.erase(sdd);
	vec.erase(sdd.base());
	// after insert or remove pointer will be invalidated
	return 0;
}*/
/*************************************************"Learn STL : Equivalence vs Equality"****************************************************
#include<set>
class lsb_less {
public:
	bool operator()(int x, int y) {
		return x > y;
	}
};
int main() {
	set<int, lsb_less >a{ 3,4,2,24,5 };
	set<int, lsb_less >::iterator itr1, itr2;
	itr1 = std::find(a.begin(), a.end(),244);       // itr1->s.end()
	itr2 = a.find(244);                             // itr2->24
	//algorithn find() lookfor equality: if x==y itr1=>end()
	//member find() lookfor equivalence if !x<y && !y<x  itr2=>26
	//fucntion using operator < > is loocking for equivalence
	// cuntion using operator == or its like looking for equality

	//algorithm equality
	//	search find_end find_first_of adjacent_seearch

	//algorithm equvalence
	//  binary_search
	//  includes
	//  lower_bound
	//  upper_bound
	// when using function beter understant if it is equality or equivalance
}*/
/*************************************************"Learn STL : Removing Elements "****************************************************
using namespace std;
#include<list>
#include<set>
#include<functional>

template<class T>
void print(T t, std::string msg) {
	cout << msg << "{";
	for (typename T::iterator it = t.begin(); it != t.end();it++) {
		cout << *it << " , ";
	}
	cout << "}" << endl;
}
bool equalone(int e,int p) {
	if (e == p) {
		cout << e << " will be removed" << endl;
		return true;
	}
	return  false;
}
int main() {
	vector<int> c = { 1,4,5,6,1,1,1,6,12,18,16,23 };//remove 1's
	print(c,"Original");
	//for (vector<int>::iterator it = c.begin(); it != c.end();) {
	//	if (*it==1) {
	//		it=c.erase(it);
	//	}
	//	else { it++; }
	//}
	//print(c,"after erase");
	auto itr_after_remove=std::remove(c.begin(),c.end(),1);
	print(c, "after algorithm erase");
	c.erase(itr_after_remove,c.end());
	print(c, "after vector erase redundant items");
	vector<int>(c).swap(c);//do shink to fit as well 
	c.shrink_to_fit();//release unused items after erase// only c++ 11
	cout << c.capacity() << endl;
	list<int> c1 = { 1,4,5,6,1,1,1,6,12,18,16,23 };//remove 1's
	print(c1, "Original c1");
//	auto itr_after_remove1 = std::remove(c1.begin(), c1.end(), 1);
	//c1.erase(itr_after_remove1, c1.end());
	//print(c1, "after erase c1");
	c1.remove(1);
	print(c1, "after list. remove c1");
	multiset<int> c2 = { 1,4,5,6,1,1,1,6,12,18,16,23 };//remove 1's

	print(c2, "Original c2");
	//	auto itr_after_remove2 = std::remove(c2.begin(), c2.end(), 1);  //not work
	//	c2.erase(itr_after_remove2, c2.end());
	c2.erase(1);
	print(c2, "after erase c1");
	{
		//vector or deque: algorithm remove() follow by erase()
		//list: member function remove()
		//associative/unordered container container: member function erase()
	}
	multiset<int> c3 = { 1,4,5,6,1,1,1,6,12,18,16,23 };//remove 1's
	print(c3, "Original");
	//for (multiset<int>::iterator it = c3.begin(); it != c3.end(); it++) {
	//	if (*it==1) {
	//		 c3.erase(it);//it will be invalidated
	//	}
	
	//}
	for (multiset<int>::iterator it = c3.begin(); it != c3.end(); ) {
		if (*it==1) {
			 c3.erase(it++);//post incrementing will return old iterator and increase iterator
		}
		else {
			it++;
		}

	}
	print(c3,"after erase");
	vector<int> c4 = { 1,4,5,6,1,1,1,6,12,18,16,23 };//remove 1's
	print(c4, "Original");
	//for (vector<int>::iterator it = c4.begin(); it != c3.end(); it++) {
	//	if (*it==1) {
	//		 c4.erase(it);//it will be invalidated
	//	}

	//}
	//for (vector<int>::iterator it = c4.begin(); it != c4.end(); ) {
	//	if (*it == 1) {
	//		it=c4.erase(it);//for vector it still invalidated, even though post incrementing will return old iterator and increase iterator
	//		//vector erase reutrn old valid iterator
	//	}
	//	else {
	//		it++;
	//	}
	//}
	print(c4, "after erase");

	{
		//summary
		//sequenca container and unorder container: itr=c.erase(itr)
        //associative container:                    c.erase(itr++)
	}
	auto itr = remove_if(c4.begin(),c4.end(), std::bind(equalone, placeholders::_1,12));

	auto itr = remove_if(c4.begin(),c4.end(),[](int e){
			if (e == 12) {
				cout << e << " will be removed" << endl;
				return true;
			}
			return  false;
   });

	print(c4, "after erase");
	c.erase(itr);
}*/

/*************************************************"Learn STL : vector vs deque "***************************************************
#include<vector>
#include<deque>
using namespace std;
class dog {
	
};
int main() {
	vector <int>vec{ 2,3,4,5 };
	cout << vec.size() <<"|"<< vec.capacity() << endl;
	vec.push_back(6);
	vec.size(); vec.capacity();
	cout << vec.size() << "|" << vec.capacity() << endl;
	vec.shrink_to_fit();
	vector<int>(vec).swap(vec);
	// drawback: expensive reallocation and require contiguous memory
	vector<dog>vecq(6);//6 dog created with default constructor
	cout << vecq.size() << "|" << vecq.capacity() << endl;
	vector<dog>vecq1;
	vecq1.resize(6);//6 dog created with default constructor
	cout << vecq1.size() << "|" << vecq1.capacity() << endl;
	vector<dog>vecq2;
	vecq2.reserve(6);//no dog created with default constructor => expensive reallocation of vector only happens when capacity of vector is full        
	cout << vecq2.size() << "|" << vecq2.capacity() << endl;
	// strategy minimize reallocation
	// 1.  // if we know how many more will be add to vector, reserve the memmory then insert more, will avoid reallocation
	// 2. if we know the end of grow to vector, we can shrink vector to release extra memory
	deque<int >vecD;
	// deque
	// - no reallocation|
	// deque has not reserve() and capacity()
	// - slightly slower than  vector
    //   + more complex data structure
	//   + Locality(data not in contiguous memory, but compiler will put deque in as contiguous memmery as possible to reduce deque performance issue than vector)
	 
	// when use vector when use deque
	// push_front a alot => deque
	// performace important => vector
	// 1. element type-when it is not a built in type, deque is not much less efficient than vector
	// 2. memory availability- could allocatiion of large contiguous memory be a problem?
	//    - limited memory size
	//    - large trunk of data
	//    - memory flagmentation
	// 3. frequency of unpredictable growth -- walk around with reserve function
	vector<int >vec;
	for (int x = 0; x < 1025; x++) {
		vec.push_back(x);// 11 reallocation performed (growth ratio=2)
	}
	// 4. invalidation of poinsters /reference/iterators because of growth => deque has not such problem growing at front and back
	// note: remove or insert in the mid still will iinvaldate pointer /reference/ iterators for deque
	// 5. vector has unique function: portal to C
	// vector a; c_fun(const int*arr, int size); c_fun(&vec[0],vec.size());
	// passing data from a list to C
	// note: &vector[0] canbe used as a raw array=>exception: vector<bool> cannot be passed as bool* to function=>walk around: use vector<int>, or bitset

	// summary
	// deque: push_front() frequent, not build_data type, contiguous memory, unpredictable growth, pointer integrity
	// vector; build-in data type, frequently passed to C function
}*/
/*************************************************"Learn STL :  Object Slicing "***************************************************/
#include<deque>
using namespace std;
class dog {
public: 
	//void bark() { cout << "idont have a name" << endl; }
	virtual void bark() { cout << "idont have a name" << endl; }
};
class yellowdog:public dog {
	string name;
public:
	yellowdog(string na) :name(na) {
	}
	void bark() { cout << "my name"<<name << endl; }
};
void fool(dog d) {
}
int main(){
	deque<dog> d;
	yellowdog y("dsfdsf");
	d.push_front(y);// pushed into d is a dog, yellowdog y is sliced to be dog
	d[0].bark();
	deque<dog*> d1;
	d1.push_back(&y);
	d1[0]->bark();
	dog d2 = y;//object slice
	fool(y);//object slice
}

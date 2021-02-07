// advanceSTL.cpp : Defines the entry point for the console application.
//
#include "stdafx.h"
#include <algorithm>
#include <iterator>
#include <functional>
#include <map>

#include <unordered_map>
#include <string>

#include <unordered_set>
#include "memberFnAndAlgorithmFn.cpp"
void memberFnAndAlgorithmFn(){
    //member function             vs             alghrithm funcitons
//LIST
    //remove                                     template<>remove_if(([](){})
    //unique                                     template<>unique([](){})
    //sort                                       template<>sort(([](){})
    //merge                                      template<>merge(([](){})
    //reverse
//ASSOCIATIVE CONTAINER
    //size_type                                  count(const T&) const;
    //iterator                                   find(const T&) const;
    //iterator                                   lower_bound(const T&) const;
    //iterator                                   upper_bound(const T&) const;
    //pair<iterator, iterator> equal_range(const T&) const;
//UNORDERED CONTAINER
    //size_type count(const T&) const;
    //iterator find(const T&)
    // std::pair<iterator,iterator>equal_range(const T&)
    std::unordered_set<int> s = { 2,4,1,8,5,9 };
    std::unordered_set<int>::iterator itr;
    itr = s.find(5);   //o(1)
    itr = std::find(s.begin(), s.end(), 4); //o(n)
    std::map<char, std::string> mp = { {'s',"sunday"},{ 'f',"friday" },{ 'm',"monday" },{ 't',"tuesday" } };
    mp.find('s'); //o(log(n)) and key only
    std::find(mp.begin(), mp.end(),std::make_pair('s',"sunday")); //o(n)
};
int main()
{
    memberFnAndAlgorithmFn();
    return 0;
}


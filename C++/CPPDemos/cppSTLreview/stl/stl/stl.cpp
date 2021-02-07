// stl.cpp : Defines the entry point for the console application.
//
#include "stdafx.h"

#include <set>
#include <map>
#include <unordered_map>
#include <vector>
#include <iostream>
#include <functional>   // std::not_equal_to
#include <deque>
#include <iterator>
#include <string>
#include <algorithm>
#include "templateIntro.cpp"
#include "stlOverview.cpp"
#include "stlIntro1cpp.cpp"
#include "iterAndAlgorithm.cpp"
#include "functor.cpp"
#include "nonModifyAlgorithm.cpp"
#include "modifyAlgorithm.cpp"
#include "sortingAlgorithm.cpp"
#include "sortedDataAlgorithm.cpp"

void templateIntro();
void stlOverview();
void stlIntro1cpp();
void iterAndAlgorithmIntro();
void functorIntro();
void nonModifyAlgorithmIntro();
void modifyAlgorithmIntro();
void sortingAlgorithmIntro();
void sortedDataAlgorithm();
bool isOdd(int i);
//void printMap(const std::unordered_map<char, std::string>);int i
template <int value>
void addvale(int a) {
    std::cout<< a + value <<std::endl;
}
int addvaluefull(int a, int b)
{
    return a + b;

}
bool lsbless(int i, int i1) {
    return (i % 10) < (i1 % 10);
}
int main()
{
    //templateIntro();
    //stlOverview();
    //stlIntro1cpp();
    //iterAndAlgorithmIntro();
    //functorIntro();
    //nonModifyAlgorithmIntro();
    //modifyAlgorithmIntro();
    //sortingAlgorithmIntro();
    sortedDataAlgorithm();
    return 0;
}
void sortedDataAlgorithm() {
/*SORTED DATA ALGORITHM*/
    // - require sorted data
    // - binary search
         // bool found = std::binary_search(start,end,value)
         // bool found = std::includes(start,end,sourcestart2,sourceend2) both container should be sorted
    // - search position
         // itr = std::lower_bound(start,end,value)
         // itr =  std::upper_bound(start,end, value)
         // pair_of_itr = std::equal_range(start,end,value)
    // - merge
         // std::merge(start,end, start2, end2, vecsource)
         // std::inplace_merge(start,rangeend,end) {1,2,3,4,5} => range 2 => {1,3,2,4,5}
    // - set operations 1. sorted containers, 2. result is sorted
         // std::set_union(start,end, start2,end2, targetstart){8,9,9,10}+{7,9,10} => {7,8,9,9,10}
         // set_intersection(start, end, start2, end2, targetstart)  {8,9,9,10}+{7,9,10} => {9,10,0,0,0}
         // set_difference(start, end, start2, end2, targetstart)  {8,9,9,10}+{7,9,10} => {8,9,0,0,0}
         // set_symmetric_difference(start, end, start2, end2, targetstart)  {8,9,9,10}+{7,9,10} => {7,8,9,0,0}
/*NUMERICA ALGORITHM*/
    // 1. accumulate
         // std::accumulate(start,end,10) with optinal iniital data 10 | std::accumulate(start,end,10,[](){}) with optinal iniital data 10
    // 2. inner product
         // std::inner_product(start,range1, range2, op-initvalue, op-[](){},op-[](){} )  inti *(v1[0]*v1[length-range2])*(v1[1]*v1[length-range2+1])*(v1[0+n]*v1[length-range+n])
    // 3. partial sum
         // std::partial_sum(start,end, start2, op-[](){})
    // 4. adjaccent difference
         // std::adjaccent_difference(start, end, start2, op->[](){})
}
void sortingAlgorithmIntro() {
    // Sorting algorithm requires random access iterator => vector,deque, container array, native array
    // std::sort(start,end) | std::sort(statt,end,[](){})
    // - partial sort
    //   std::partial_sort(start, rangeend, end, [](){})
    //   std::partial_sort(start, rangeend, end)
    // - top highest
    //   std::nth_element(start,rangeend, end,[](){})
    // - move students score <10 to front
    //   std::partition(stat,end, [](){})
    //   std::stable_partition(start, end, [](){})
    // - Heap algorithm
    //   1. first element is always largest
    //   2. add remove take o(log n)time
    //   std::make_heap(start emd) {1,2,3}=>{3,1,2}
    //   std::pop_heap(start,end) => two step, 1. swap fir with last. 2 Heapify start to end-1 | 1.{9,5,2,1}=>{1,5,2,9} 2. {1,5,2,9}=>{5,1,2}
    //   std::pop_back()
    //   std::sort_heap() work only on heap
}
void modifyAlgorithmIntro() {
    //Value Changing Algorithm
    // std::copy std::copy_if std::copy_n std::copy_backword
    // std::move(start,end, start2) std::move_backward(start,end,start2)
    // std::transform(source1start, source1end, source2start, destinationstart, [](){})
    // std::swap - twowaycopying
       //std::swap_range(start,end,start2) 
    // std::fill(start,end,value) | std::fill_n(start, number,value) | std::generate(start,end,std::rand) | std::generate_n(start,number,std::rand)
    // std::replace(start,end, old, new) | std::replace_if(start,end,[](){}, newvalue) | replace_copy(start,end, start2,old,new)
       // generalized: std::replace_copy_if#
    // std::remove(start,end, value) remove all equal value
       // std::remove_if(start,end,[](){})
       // std::remove_copy(start,end,start2,value) // remove all value and copy the remain items to vec2, std::remove_copy_if()
       // std::unique(start, end) remove duplicate
       // std::unique(start,end,[](){})
       // std::unique_copy(start,end,start2), remove duplicate and copy unified elements
    //ORDER CHANGING ALGORITHM
    // std::reverse(start,end)
    // std::reverse_copy(start, emd, start2)
    // std::rotate(start, start+3, end)  {1,2,3,4,5,6} => {4,5,6,1,2,3}
    // std::rotate_copy(start, start+3, end, start2)  {1,2,3,4,5,6} => {4,5,6,1,2,3}
    // permute
        // std::next_permutation(start,end) => lexicographically next greater permutation  {1,2,3,4}<{1,2,4,4}
        // prev_permutation(start,end) => lexicographically next smaller permutation{1,2}<{1,2,3}
    // shuffle std::random_shuff(start,end), random_shuffle(start, end, std::rand)
        // std::shuffle(start,end, default_random_engine())
}
void nonModifyAlgorithmIntro() {
    // Non-modifying Algorithm
      // counting std::count, std::count_if
      // min max:: std::min_element std::max_element, {std::minmax_element return pair(first smallest and last biggest);} 
      // compare
        /*
        comparing ranges:
          equal(start, end, start2)
          is_permutation(start, end, start2)
          mismatch(start, end, start2)
          lexicographical_compare(start, end, start2, end2)
        */
      // linear search: std::find() return fistmatchitem, std::find_if
          // std::search_n(start, end, number, value) std::search(start, end, substart, subend)>first subrange   std::find_end(start, end, substart, subend)>last subrange
          // search any_of| std::find_first_of
          // search adjacent| std::adjacent_find
      // check attribute
         //std::issorted(start,end)
         //std::issorted_until(start,end)
         //std::is_partitional(start,end,[](){})
         //std::is_heap(start,end)
         //std::is_heap_until(start,end)
         // std::all_of
         //std::any_of
         //std::none_of
}
void functorIntro() {
    /* Benefit of functor */
    // 1. smart function: capabilities beyond operator() it can remember state
    // 2. it can have its own type
    functorX x("theone");
    x();
    std::vector<int> intVet = { 3,7,4,65,3 };
    std::for_each(intVet.begin(), intVet.end(), addvale<3>);
    int par = 3;
    //std::for_each(intVet.begin(), intVet.end(), addvale<par>);// not work for dynamic template function

    std::for_each(intVet.begin(), intVet.end(), [](int item) {
        std::cout << item << std::endl;
    });
    std::for_each(intVet.begin(), intVet.end(), *(new functorAdd(12)));
    // BUILD IN FUNCTORS
    std::cout<<std::multiplies<int>()(3,4)<< std::endl;
    if (std::not_equal_to<int>()(par, 10)) {
        std::cout << par << std::endl;
    }
    // PARAMETER BINDING
    std::set<int> myset = { 2,3,4,5 };
    std::vector<int> vec;
    int xqq = std::multiplies<int>()(3, 4);
    std::transform(myset.begin(), myset.end(), std::back_inserter(vec), std::bind(std::multiplies<int>(), std::placeholders::_1,10));
    std::for_each(intVet.begin(), intVet.end(),std::bind(addvaluefull, std::placeholders::_1, 14));
    // CONVERT REGULAR FUNCTION TO FUNCTOR
    std::deque<int> d;
    auto functorConvertor = std::function<int (int, int)>(addvaluefull);//c11    c03 uawe std::ptr_fun
    std::transform(myset.begin(), myset.end(), std::back_inserter(d), std::bind(functorConvertor, std::placeholders::_1, 55));
    int a1 = 1; int a2 = 2;
    std::logical_or<bool>()(a1, a2);
    std::deque<int> d1;// x>20|| x<5 copy from myset to d
    std::transform(myset.begin(), myset.end(), 
        std::back_inserter(d1), 
        std::bind(std::logical_or<bool>(), 
            std::bind(std::greater<int>(), std::placeholders::_1, 20), 
            std::bind(std::less<int>(), std::placeholders::_1, 5))
    );
    std::transform(myset.begin(), myset.end(),
        std::back_inserter(d1),
        [](auto x) {
          return x > 20 || x < 5;
        }
    );
    // WHY FUNCTOR ?
    std::set<int>mysets = { 3,1,25,7,12 };  // myset: {1,3,7,12,25}
    // equal to
    std::set<int, std::less<int>> myset1 = { 3,1,25,7,12 };
    auto lsbFntor = std::function<bool(const int, const int)>(lsbless);
    //std::set<int, lsbFntor> myset1 = { 3,1,25,7,12 }; // functor wapper not a type
    std::set<int, lbless> myset12 = { 3,1,25,7,12 };     // actual created from object is a type

    // Predicate functor=> return bool, no modification of data
    // used for comparison and condition check
  
}
void iterAndAlgorithmIntro() {
  //  std::for_each(iterbegin, iterend, myfunction): //myfunctiuon only ready no modify
    //Iterator Adaptor
    //1. insert iterator
    std::vector<int>v1 = { 1,2,3,4,5 };
    std::vector<int>v2 = { 1,2,13,4,5 };
    std::vector<int>::iterator itr = std::find(v2.begin(), v2.end(), 13);
    std::insert_iterator<std::vector<int>> insertIter(v2, itr);
    std::copy(v1.begin(), v1.end(), insertIter);
    std::for_each(v2.begin(), v2.end(), [](auto item) {
        std::cout << item << std::endl;
    });
      // other insert iterators: back_insert_iterator, front_insert_iterator
    //2. stream interator
   // std::vector<std::string> v3;
   // std::copy(std::istream_iterator<std::string>(std::cin), std::istream_iterator<std::string>(), std::back_inserter(v3));
   // std::copy(v3.begin(), v3.end(), std::ostream_iterator<std::string>(std::cout, " "));
    // std::copy(std::istream_iterator<std::string>(std::cin), std::istream_iterator<std::string>(), std::ostream_iterator<std::string>(std::cout, " "));

    //3. reverse iterator
    std::vector<int> v4 = { 1,2,3,4 };
    std::reverse_iterator<std::vector<int>::iterator> riter;
    for (riter = v4.rbegin(); riter != v4.rend(); riter++) {
        std::cout << *riter << std::endl;
    }
    /* 
      Algorithms - mostly loops
    */
    std::vector<int>::iterator itr1 = std::min_element(v4.begin(), v4.end());
    // Note 1: Algorithm alway process rages in a half-openway: [begin, end)
    std::sort(v4.begin(), itr1);
    std::reverse(itr1, v4.end());
    // Note 2: 
    std::copy(itr1, v4.end(), v1.begin());  // v1 should has enought space for copied elements, or undefined behaviour   => unsafe
    std::for_each(v1.begin(), v1.end(), [](auto item) {
        std::cout << item << std::endl;
    });
    // Note 3: 
    std::copy(itr1, v4.end(), std::back_inserter(v1));  // back_insert is safer then just copy into v1, but inefficient because insert element one by one => inefficient
    v1.insert(v1.end(), itr1, v4.end()); // (insertPosition, startElement, endElement)  => efficient and safe
    // Note 4: Algorithm with function
    //std::find_if(start, end, []() {
    //return false})
    // Note 5: Algorithm with native c++ array
    int arr[4] = { 13,2,3,4 }; // pointer canbe think of an iterator
    std::sort(arr, arr+4);


}
bool isOdd(int i) { return i % 2; }
void stlIntro1cpp() {
// *SEQUENCE CONTAINER*
    // vector-> grow at end
        // 1 fast insert / remove at the end: O(1)
        // 2. slow insert / remove at the begining or in the middle: O(n)
        // 3. slow search: O(n)
    // deque-> grow at end and begining
        // 1 fast insert / remove at the end: O(1)
        // 2. slow insert / remove at the begining or in the middle: O(n)
        // 3. slow search: O(n)
    // list 
        // 1. fast insert/remove at any place : o(1)
        // 2. slow search : o(n), slower then vector due to locality. vector store in contigious memory, list store in different places(swap data in/out data from cache for list, consume too much)
        // 3. no rondam access : []
        // mylist1.splice(itr, mylist2, itr_a, itr_b), splice() function is advantage of list container, moving large chunk from one container to another
    // forward list -> one direction list
    // Array container array<int,3>a={3,4,5}
        // limitations: array container of different size is different type 
// *ASSOCIATIVE CONTAINER*  | always sorted | 
    // set | no duplicated item | default sort by operator < | no push_back push_front |
        // 1 insertion & search time: o(log (n)) => logarithmic time
        // 2 std::set::insert(iter, value) 
        // 3 std::set::earse(iter) o(1) |  std::set::earse(value) =>log(n)
        // 4 traversing is slow (compared to vector and deque), not contigeous memory
    // multiset | allow duplicate | value is read only
        // 1. fast search o(log(n))
        // 2. traversing is slow (compared to vector and deque), not contigeous memory
        // 3. no random access, no[] operator
    // map | no duplicated key | key is read only
        // pair<char, int>("key", value) | make_pair("key", value)
        // map::insert(iter, pairValue)
        // find(key) log(n)
// multimap
// *UNORDERED CONTAINER*   || hash collision => performance degrade o(1) constant time -> o(n) linear time
    // unordered set | value read only
       // 1. unordered_set::find(value) o(1)=> if not find return iter->end()=>deference end() undefined behaviour
       // 2. unordered_set::insert(value) o(1) | unordered_set::insert(startiter, enditer); //work with different container
    // unordered multiset | allow duplicate
    // unordered map | key read only
    // unordered multimap | allow duplicate key
    // associative array
    //std::unordered_map<char, std::string> days = { {'s',"Sunday"},{'f', "Friday"} };
    //days['s']; days.at('s'); days['w'] = "Wednesday"; // add new or update existing
    //days.insert(std::make_pair( 's',"Sataurday") );
 // Map vs unordered map
    //1. unorderdmap o(1) : map o(log(n))
    //2. unorderedmap may degrade to o(n);
    //3. cant use multimap and unordered_multimap, no [] operator
// CONTAINER ADAPTOR
    // stack lifo, push(), pop(), top()
    // queue fifo, push(), pop(), top(), front()
    // priority queue: first item higher priority, push(), pop(), top()
    // modify vector, old pointer may invalidated, nodebased container has no efffect(list)
}
//void printMap(const std::unordered_map<char, std::string> themap) {
    //std::cout << themap['s'] << std::endl; // const map cannot use random access iterator
    //themap.find('s');// for const map which is read only
//}
void stlOverview() {

}
void templateIntro() {
    int a = 6;
    double a1 = 6.6;

   std::cout<< mytemplate::square<double>(a);
   std::cout << mytemplate::square<int>(a1);

}
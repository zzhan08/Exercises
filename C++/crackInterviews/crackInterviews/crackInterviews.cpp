// crackInterviews.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "reverseSingleLinkedList.cpp"
#include "reverseDoubleLinkedListcpp.cpp"
#include "genericLinkedList.cpp"

void reverseSingleLinkedList() {
    singleLinked mysin;
    mysin.push_back(1);
    mysin.push_back(8);

    mysin.push_back(2);
    mysin.push_back(7);

    mysin.push_back(3);
    mysin.push_back(6);

    mysin.push_back(4);
    mysin.print();
    std::cout << std::endl;

    mysin.theReverse();
    mysin.print();
    std::cout << std::endl;
    mysin.bubbleSort();
    mysin.print();
    std::cout << std::endl;


}
void reverseDoubleLinkedList() {
    doubleLinked mysin;
    mysin.push_back(1);
    mysin.push_back(2);
    mysin.push_back(3);
    mysin.push_back(4);
    mysin.printf();
    mysin.printb();
    std::cout << std::endl;

    mysin.theReverse();
    mysin.printf();
    mysin.printb();
   std::cout<< std::endl;

}
void genericLinkedLista() {
    genericLinkedList<int> g;
    g.push_back(1);
    g.push_back(2);
    g.push_back(3);
    g.push_back(4);
    g.print();
    std::cout << std::endl;
}
int main()
{
    //reverseSingleLinkedList();
    //reverseDoubleLinkedList();
    genericLinkedLista();
    return 0;
}


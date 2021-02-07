#include "stdafx.h"
#include <iostream>
#include <string>
/*C++*/
template <typename T>
struct genericNode {
    T value;
    genericNode<T>* next;
};
template <class T>
class genericLinkedList {
    genericNode<T>* head;
    genericNode<T>* tail;
    int size = 0;
public:
    genericLinkedList() {
        head = nullptr;
        tail = nullptr;
        int size = 0;
    }
    void push_back(T n) {
        genericNode<T> *temp= new genericNode<T>;
        temp->next = new genericNode<T>;
        temp->value = n;
        if (head == nullptr) {
            head = new genericNode<T>;
            head = temp;
            tail = temp;
        }
        else {
            tail->next = temp;
            tail = temp;
        }
        size += 1;
    }
    void print() {
        genericNode<T>* current = head;
        while (current != new genericNode<T>) {
            std::cout << current->value << " ";
            current = current->next;
        }
    }
};
/*C
typedef struct genericNode_t {
void* value;
genericNode_t* next;
} genericNode;

class genericLinkedList {
genericNode* head;
genericNode* tail;
int size = 0;
public:
genericLinkedList() {
genericNode* head = (genericNode *)0;
genericNode* tail = (genericNode *)0;
int size = 0;
}
void push_back(void* n) {
genericNode *temp = (genericNode *)malloc(sizeof(struct genericNode_t));
temp->next = (genericNode *)0;
temp->value = n;
if (head == (genericNode *)0) {
head = temp;
tail = temp;
}
else {
tail->next = temp;
tail = temp;

}
size += 1;
}
void print() {
genericNode* current = head;
while (current != (genericNode *)0) {
std::cout << *(int *)(current->value) << " ";
current = current->next;
}
}
};*/

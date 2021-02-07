#include "stdafx.h"
#include <iostream>
#include <string>

typedef struct node_t_d {
    int value;
    struct node_t_d* next;
    struct node_t_d* prev;

} noded;
class doubleLinked {
    noded* head;
    noded* tail;
    int size;
public:
    doubleLinked() {
        noded* head = (noded *)0;
        noded* tail = (noded *)0;
        int size = 0;
    }
    void push_back(int n) {
        noded *temp = (noded *)malloc(sizeof(struct node_t_d));
        temp->next = (noded *)0;
        temp->prev = (noded *)0;
        temp->value = n;
        if (head == (noded *)0) {
            head = temp;
            tail = temp;
        }
        else {
            tail->next = temp;
            temp->prev = tail;
            tail = temp;

        }
        size += 1;

    }
    void recursiveReverse(noded * previous) {
        if (previous != (noded *)0) {
            recursiveReverse(previous->next);
            noded * ph = previous->prev;
            previous->prev = previous->next;
            previous->next = ph;
        }
        
    }
    void theReverse() {
        recursiveReverse(head);
        noded * ph = tail;
        tail = head;
        head = ph;
    }
    void reverse() {
        if (head == (noded *)0) {
            return;
        }
        noded * iterator;
        noded * iterNext;
        noded * placeHolder;

        iterator = head;
        iterNext = iterator->next;
        head->next = (noded *)0;
        while (iterNext != (noded *)0) {
            placeHolder = iterNext->next;
            iterNext->next = iterator;
            iterator->prev = iterNext;
            iterator = iterNext;
            iterNext = placeHolder;
        }
        iterator->prev = (noded *)0;
        tail = head;
        head = iterator;
    }
    void printf() {
        noded* current = head;
        while (current != (noded *)0) {
            std::cout << current->value << " ";
            current = current->next;
        }
    }
    void printb() {
        noded* current = tail;
        while (current != (noded *)0) {
            std::cout << current->value << " ";
            current = current->prev;
        }
    }
    void bubblesort() {
        int i, j;
        for (i = 1; i < size; i++) {

        }
    }
};
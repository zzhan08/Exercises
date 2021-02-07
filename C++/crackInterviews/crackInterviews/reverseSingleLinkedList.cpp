#include "stdafx.h"
#include <iostream>
#include <string>

typedef struct node_t {
    int value;
    struct node_t* next;
} node;
class singleLinked {
    node* head;
    node* tail;
    int size;
public:
    singleLinked() {
        node* head = (node *)0;
        node* tail = (node *)0;
        int size = 0;
    }
    void push_back(int n) {
        node *temp = (node *)malloc(sizeof(struct node_t));   
        temp->next = (node *)0;    
        temp->value = n;
        if (head == (node *)0) {
            head = temp;
            tail = temp;
        }
        else {
            tail->next = temp;
            tail = temp;

        }
        size += 1;

    }
    void recursiveReverse(node * previous) {
        if (previous->next != (node *)0) {
            recursiveReverse(previous->next);
            previous->next->next = previous;
            previous->next = (node *)0;
        }
    }
    void theReverse() {
        recursiveReverse(head);
        head = tail;
    }
    void Delete(node* item) {
        node* ph = item->next;
        item->next = (node*)0;
        item = ph;
        ph = (node*)0;
    }
    void bubbleSortAlg(node * position) {
        if (position->next == (node *)0) {
            return;
        }
        bubbleSortAlg(position->next);
        int ph;
        node* iterator = position->next;
        while (iterator != (node *)0) {

            if (position->value > iterator->value) {
                ph = iterator->value;
                iterator->value = position->value;
                position->value = ph;
                position = iterator;
                iterator = iterator->next;
            }
            else {
                position = iterator;
                iterator = iterator->next;
            }
        }
    }
    void bubbleSort() {
        if (head == (node *)0) {
            return;
        }
        bubbleSortAlg(head);
    }
    void reverse() {
        if (head == (node *)0) {
            return;
        }
        node * newHead, *thenext, *current;
        newHead = head;
        current = head->next;
        newHead->next = (node *)0;
        while (current != (node *)0) {
            thenext = current->next;
            current->next = newHead;
            newHead = current;
            current = thenext;
        }
        head = newHead;
    }
    void print() {
        node* current = head;
        while (current!= (node *)0) {
            std::cout << current->value << " ";
            current = current->next;
        }
    }
};
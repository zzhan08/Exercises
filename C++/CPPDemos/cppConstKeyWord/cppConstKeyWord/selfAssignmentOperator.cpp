#include "stdafx.h"
#include <iostream>
#include <string>
#include <memory>
class assignOperator {};
class selfAssignOperaotr{
    // asssignment operator -> operator=
    assignOperator *ao;
    
    selfAssignOperaotr operator=(const selfAssignOperaotr & source) {
       // solution 1
           // problem happen if source is this
            /*if (&source == this) { // extra run time cost
                return *this;
            }
            //delete ao;
            assignOperator * porigin = ao;
            ao = new assignOperator(*source.ao);// if this line throw exception, the ao already been deleted, there will be a problem
            delete porigin;
            return *this;*/
       // solution 2
        *ao = *source.ao; // extra run time cost
        return *this;
    }
};
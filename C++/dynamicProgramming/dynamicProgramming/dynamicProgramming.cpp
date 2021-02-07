// dynamicProgramming.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <string>
#include <iostream>
#include <vector>
#include <unordered_map>
void lis() {
    std::vector<int>D{3,2,6,4,5,1};
    std::vector<std::vector<int>> L(D.size());
    L[0].push_back(D[0]);
    for (int i = 1; i < D.size(); i++ ) {
        for (int j = 0; j < i; j++) {
            if (D[j] < D[i] && L[i].size() < L[j].size() + 1) {
                L[i] = L[j];
            }
        }
        L[i].push_back(D[i]);
    }
    for (auto x: L) {
        for (auto y : x) {
            std::cout << y << " ";
        }
        std::cout << std::endl;
    }
}
void printlcs(std::vector<std::vector<char>>&s, std::string &x, int i, int j) {
    if (i == 0 || j == 0)
        return;
    if ('s' == s[i][j]) {
        printlcs(s, x, i - 1, j - 1);
        std::cout << x[i];
    }
    else if ('j' == s[i][j]) {
        printlcs(s, x, i, j - 1);

    }
    else {
        printlcs(s, x, i - 1, j);

    }
}
void lcs() {
    std::string X = " ACCG";
    std::string Y = " CCAGCA";
    std::vector<std::vector<int>> L;
    std::vector<std::vector<char>> C;
    for (int i = 0; i < X.size(); i++) {
        L.push_back(std::vector<int>(Y.size(),0));
        C.push_back(std::vector<char>(Y.size()));

    }
    for (int i = 1; i < X.size(); i++) {
        for (int j = 1; j < Y.size(); j++) {
            if (X[i] == Y[j]) {
                L[i][j] = L[i - 1][j - 1] + 1;
                C[i][j]=('s');
            }
            else if (L[i][j - 1]>L[i - 1][j]) {
                L[i][j] = L[i][j - 1];
                C[i][j] = 'j';
            }
            else {
                L[i][j] = L[i - 1][j];
                C[i][j] = 'i';

            }
        }
    }
    for (auto x : L) {
        for (auto y : x) {
            std::cout << y << " ";
        }
        std::cout << std::endl;
    }
    printlcs(C, X, X.size()-1, Y.size()-1);

}
class Disjoint_set {
    std::unordered_map<char, char> PARENT;
    std::unordered_map<char, int> RANK;

public:
    Disjoint_set() {
        char universe[] = { 'a', 'b', 'c', 'd', 'e' };
        for (char x: universe) {
            PARENT[x] = x;
            RANK[x] = 0;
        }
        PARENT['d'] = 'b';
        RANK['b'] = 1;
    }
    char Find(char item) {
        if (PARENT[item] == item) {
            return item;
        }
        else {
            return Find(PARENT[item]);
        }
    }
    void Union(char set1, char set2) {
        PARENT[set1] = set2;
        if (RANK[set1] > RANK[set2]) {
            PARENT[set2] = set1;
        }
        else if (RANK[set1] < RANK[set2]) {
            PARENT[set1] = set2;
        }
        else {
            PARENT[set1] = set2;
            RANK[set2]++;
        }
    }
};
int sockMerchant(int n, std::vector<int> ar) {
    int numberofPair = 0;
    std::vector<int> coll(100);
    for (int i = 0; i< ar.size(); i++) {
        coll[ar[i]-1]++;
    }
    for (int j = 0; j< coll.size(); j++) {
        if (coll[j] > 1) {
            numberofPair += (int)(coll[j] * 0.5);
        }
    }
    return   numberofPair;
}
long repeatedString(std::string s, long n) {
    unsigned long int showTime = 0;
    unsigned long long int size = (unsigned long long int)n;
    for (unsigned long int i = 0; i<size; i++) {
        unsigned long int access = i;
        if (access >= s.size()) {
            access = access % s.size();
        }
        if (s[access] == 'a') {
            showTime++;
        }
    }
    return showTime;
}
int countingValleys(int n, std::string s) {
    int level = 0;
    int valley = 0;
    for (int i = 0; i < n; i++) {
        int prev = level;
        if (s[i] == 'U') {
            level += 1;
            if (prev < 0 && level == 0) {
                valley++;
            }
        }
        else {
            level -= 1;
            
        }
    }
    return valley;
}
int hourglassSum(std::vector<std::vector<int>> arr) {
    int sumCollector = 0;
    std::cout << "=============== Display ===============" << std::endl;
    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr[i].size(); j++) {
            std::cout << arr[i][j] << " ";
        }
        std::cout << std::endl;

    }
    std::cout << "==============================" << std::endl;

    for (int i = 1; i < arr.size() - 1; i++) {
        for (int j = 1; j < arr[i].size() - 1; j++) {
            int current = arr[i][j] +
                arr[i - 1][j - 1] + arr[i - 1][j] + arr[i - 1][j + 1] +
                arr[i + 1][j - 1] + arr[i + 1][j] + arr[i + 1][j + 1];
            std::cout << "===============EACH===============" << std::endl;
            std::cout << arr[i - 1][j - 1] << " " << arr[i - 1][j] << " " << arr[i + 1][j + 1] << std::endl;
            std::cout << "  " << arr[i][j] << "  " << std::endl;
            std::cout << arr[i + 1][j - 1] << " " << arr[i + 1][j] << " " << arr[i + 1][j + 1] << std::endl;

            std::cout << "===============END EACH===============" << std::endl;

            std::cout << "Sum: " << current << " "<<std::endl;
            if (i == 1 && j == 1) {
                sumCollector = current;
            }else if (current >= sumCollector) {
                sumCollector = current;
            }
        }
        std::cout << std::endl;

    }

    return sumCollector;

}
int main()
{
    //std::vector<int> arrs = { 44, 55, 11, 15, 4, 72, 26, 91, 80, 14, 43, 78, 70 ,75, 36, 83 ,78 ,91 ,17 ,17 ,54 ,65, 60, 21, 58, 98, 87, 45, 75, 97, 81, 18, 51, 43, 84, 54, 66, 10, 44, 45, 23, 38, 22, 44, 65, 9 ,78, 42, 100, 94, 58, 5 ,11, 69, 26, 20, 19, 64, 64, 93, 60, 96, 10, 10, 39, 94, 15, 4, 3 ,10, 1, 77, 48, 74, 20, 12, 83 ,97, 5, 82, 43 ,15, 86, 5 ,35, 63 ,24 ,53 ,27, 87 ,45, 38 ,34 ,7, 48, 24 ,100 ,14 ,80, 54 };
    //lis();
    //int cout = sockMerchant(arrs.size(), arrs);
    //std::cout << cout << std::endl;
    //std::cout << countingValleys(8, "UDDDUDUU") <<std::endl;;
    /*  1 1 1 0 0 0
        0 1 0 0 0 0
        1 1 1 0 0 0
        0 0 2 4 4 0
        0 0 0 2 0 0
        0 0 1 2 4 0*/
    std::vector<std::vector<int>> a;
    a.push_back({ -1,-1,0,-9,-2,-2});
    a.push_back({ -2,-1,-6,-8,-2,-5 });
    a.push_back({ -1,-1,-1,-2,-3,-4 });
    a.push_back({ -1,-9,-2,-4,-4,-5 });
    a.push_back({ -7,-3,-3,-2,-9,-9 });
    a.push_back({ -1,-3,-1,-2,-4,-5 });
    std::cout << hourglassSum(a) << std::endl;
    //lcs();
    return 0;
}


// practicalProgrammingAlgorithm.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <algorithm>
#include <vector>
#include <string>
#include <iostream>
#include <unordered_map>

void calc_lis(std::vector<int> &D) {
    std::vector<std::vector<int>>L(D.size());
    L[0].push_back(D[0]);
    for (int i = 1; i < D.size(); i++) {
        for (int j = 0; j <i; j++) {
            if ((D[j]<D[i])&&(L[i].size()<L[j].size()+1)) {
                L[i] = L[j];
            }
        }
        L[i].push_back(D[i]);
    }
    // print L
    for (int i = 0; i < L.size();i++) {
        std::cout << "L member (";
        for (int h = 0; h < L[i].size(); h++) {
            std::cout << L[i][h];
        }
        std::cout << ")" << std::endl;

    }
}
void increasingSubSequence() {
    std::vector<int> iss = { 1,2,6,4,5,1 };
    //increasing subsequence {3,6},{2,6},{3,4},{3,4,5},{2,4},{2,4,5},{4,5},{1}
    calc_lis(iss);
}
void longestSubse(std::string a, std::string b) {
    std::vector<std::vector<int>>C;
    std::vector<std::vector<char>>s;
    for (int h = 0; h < a.size(); h++) {
        C.push_back(std::vector<int>(b.size(),0));
        s.push_back(std::vector<char>(b.size()));

    }
    for (int i = 1; i < a.size(); i++) {
        for (int j = 1; j <b.size(); j++) {

            if (a[i]==b[j]) {
                C[i][j] = C[i - 1][j - 1] + 1;
                s[i][j] = a[i];
            }
            else if (C[i][j-1] > C[i-1][j]) {
                C[i][j] = C[i][j-1];
                s[i][j] = 'j';

            }
            else{
                C[i][j] = C[i-1][j];
                s[i][j] = 'i';

            }
        }
    }
    // print sL
    for (int i = 0; i < s.size(); i++) {
        std::cout << "L member (";
        for (int h = 0; h < s[i].size(); h++) {
            std::cout << s[i][h];
        }
        std::cout << ")" << std::endl;

    }
}
void longestSubSequence() {
    std::string a = " ACCGGTTAC";
    std::string b = " AGGACCA";
    longestSubse(a,b);
}
struct disjoint_Set{
    std::unordered_map<char, char> parent;
    std::unordered_map<char, int> rank;//record depth of trees

public:
    disjoint_Set() {
        char universe[] = {'a','b','c','d','e'};
        for (char x : universe) {
            parent[x] = x;
            rank[x] = 0;
        }
        parent['d'] = 'b';
        rank['b'] = 1;
    }
    char find(char item) {
        if (parent[item] == item) {
            return item;
        }
        else return find(parent[item]);
    }
    void Union(char set_1, char set_2) {
        if (rank[set_1]>rank[set_2]) {
            parent[set_1] = set_2;
        }
        else if(rank[set_1]<rank[set_2]){
            parent[set_2] = set_1;

        }
        else {
            parent[set_2] = set_1;
            rank[set_2]++;
        }
    }
    void makeSet(char vertex) {
        parent[vertex] = vertex;
        rank[vertex] = 0;
    }
};
void disjointSet() {
    //tree based disjoint sets(tree frest)
    // a set is identified by root
    disjoint_Set ds;
    std::cout << ds.find('c') << std::endl;
}
struct edge {
    char vertex1;
    char vertex2;
    int weight;
    edge(char v1, char v2, int w) :vertex1(v1), vertex2(v2), weight(w) {
    }
};
struct graph {
    std::vector<char> vertices;
    std::vector<edge> edges;
};
void Kruskal(graph& g) {
    std::vector<edge> A;
    for (auto c : g.vertices) {
    }
}
void prim() {

}
void miniSpaningTree() {
    //Kruskal algorithm
    char t[] = { 'a','b','c','d','e','f' };
    graph g;
    g.vertices = std::vector<char>(t, t+sizeof(t)/sizeof(t[0]));
    g.edges.push_back(edge('a', 'b', 4));
    g.edges.push_back(edge('a', 'f', 2));
    g.edges.push_back(edge('f', 'c', 1));
    g.edges.push_back(edge('f', 'e', 4));
    g.edges.push_back(edge('c', 'd', 3));
    g.edges.push_back(edge('d', 'e', 2));
    g.edges.push_back(edge('b', 'c', 6));
    g.edges.push_back(edge('b', 'f', 5));
    Kruskal(g);
    // prim algorithm
    prim();
}
int main()
{
    // increasingSubSequence();
    // longestSubSequence();
    disjointSet();
    return 0;
}


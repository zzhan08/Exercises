using System;
using System.Collections.Generic;


List<int> primeList = getPrimeList(5);
//Console.WriteLine("is Prime ", primeList.ToString());
int position = fiabnaci(5);
Console.WriteLine("position:",position);
int fiabnaci(int n)
{
    int temp = 0;
    if (n < 2)
    {
        return n;
    }
    int a = 0;
    int b = 1;
    int i = 2;
    while (i <= n)
    {
        temp = a + b;
        b = temp;
        a = temp - a;
        i++;
    }
    return temp;
}
 List<int> getPrimeList(uint n)
{
    List<int> primeList = new List<int>() { };
    if (n == 0)
    {
        return primeList;
    }
    primeList.Add(1);

    if (n == 2)
    {
        primeList.Add(2);
        return primeList;
    }

    for (int i = 2; i <= n; i++)
    {
        if (isPrime(ref i))
        {
            primeList.Add(i);
        }
    }
    return primeList;
}
 bool isPrime(ref int num)
{

    if (num < 2)
    {
        return false;
    }
    if (num == 2)
    {
        return true;
    }
    if (num % 2 == 0)
    {
        return false;
    }
    int root = (int)Math.Sqrt(num);
    for (int i = 3; i <= root; i += 2)
    {
        if (num % i == 0)
        {
            return false;
        }
    }
    return true;
}
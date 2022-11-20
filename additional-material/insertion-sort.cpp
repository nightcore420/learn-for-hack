#include<iostream>
#include<conio.h>
#include<iomanip>

using namespace std;

int main()
{
  int Value[20];
  int i, j, k, N;
  int temp;
  cout<<"Enter Many Number : ";
  cin>>N;
  for(i=0; i<N; i++)
  {
    cout<<"Element "<<i<<" : ";
    cin>>Value[i];
  }
  
  //Process before sorted
  cout<<"\nData before sorted : ";
  for(i=0; i<N; i++)
    cout<<setw(3)<<Value[i];
    
  //Sorting Process
  for(i=1; i<N; i++)
  {
    temp = Value[i];
    j=i-1;
    while((temp <= Value[j]) && (j>=1))
    {
      Value[j+1] = Value[j];
      j--;
    }
    if(temp >= Value[j])
      Value[j+1] = temp;
    else
    {
      Value[j+1] = Value[j];
      Value[j] =  temp;
    }
    cout<<endl;
    for(k=0; k<N; k++)
      cout<<setw(3)<<Value[k];
  }
  
  //Print out afte sorted
  cout<<"\nData after sorted : ";
  for(i=0; i<N; i++)
    cout<<setw(3)<<Value[i];
  getch();
}
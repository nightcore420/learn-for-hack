for x in range(0,10,+1):
    for y in range(1,x):
        print(y % 2,end =" ")
        if (y % 2) == 0:
            print("1", end=" ")
        else :
            print("0", end=" ")
    print()
for x in range(10,0,-1):
    for y in range(1,x):
        print(y % 2, end =" ")
        if (y % 2) == 0:
            print("1", end=" ")
        else :
            print("0", end=" ")
    print()

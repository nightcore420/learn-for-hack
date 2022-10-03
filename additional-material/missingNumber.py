n = int(input())
givenArr = list(map(int, input().split()))

def missingNumber(n):
    miss_number = n * (n + 1) / 2 - sum(givenArr)
    print(int(miss_number))

missingNumber(n)


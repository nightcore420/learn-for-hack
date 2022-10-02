import os
os.system('cls')
nil1 = int(input("Nilai Pertama : "))
nil2 = int(input("Nilai Kedua : "))

lebihdari = nil1 > nil2
kurangdari = nil1 < nil2
samadengan = nil1 == nil2
tidaksamadengan = nil1 != nil2
lebihdarisamadengan = nil1 >= nil2

print(nil1, ">", nil2, "adalah :", lebihdari)
print(nil1, "<", nil2, "adalah :", kurangdari)
print(nil1, "=", nil2, "adalah :", samadengan)
print(nil1, "!=", nil2, "adalah :", tidaksamadengan)
print(nil1, ">=", nil2, "adalah :", lebihdarisamadengan)
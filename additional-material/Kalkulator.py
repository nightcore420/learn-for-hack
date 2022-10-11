def getInput():
    f_num = int(input("Masukkan Nilai Pertama: "))
    s_num = int(input("Masukkan Nilai Kedua: "))
    return f_num,s_num

def add():
    x,y = getInput()
    return x + y 

def sub():
    x,y = getInput()
    return x - y

def div():
    x,y = getInput()
    return x // y #For Int Divide

def mul():
    x,y = getInput()
    return x * y 

def error():
    return "Invalid Choice"

print('''
    Selamat Datang Di Kalkulator v.0.1
    1.Penambahan
    2.Pengurangan
    3.Pembagian
    4.Perkalian    
''')

pilihan = int(input("Pilih Operator: "))

# #Bisa Kita Menggunakan List
# """
operations =[add, sub, div, mul]#mengapa tidak add()> >> Jika semua nya menggunakan () maka operasi akan mengeksekusi semua list yang ada di variable

output = operations[pilihan - 1]()
print(output)
# """
#Bisa Kita Pake Dictionary
operations ={
    1: add,
    2: sub,
    3: div,
    4: mul
}

output= operations.get(pilihan, error)() #Kode Bisa Seperti Ini
print(output) #Karena () ini akan menampilkan hasil dari fungsi def (),ini akan menyebabkan error jika salah satu fungsi tidak ada




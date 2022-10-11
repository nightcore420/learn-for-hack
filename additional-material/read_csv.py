import csv

# Bikin Alias Variable
name = ""
with open(name) as file:
    # Akses File 
    reader = csv.reader(file)
    
    count = 0

    # Untuk ngebaca datanya
    for row in reader:
        print(row) # variable data bisa dikasih indexing karena csv berupa array kalo dilihat contoh data[0] 

        if count > 5:
            break
    
        count += 1
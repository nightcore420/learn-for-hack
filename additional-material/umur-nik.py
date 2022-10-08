#!/usr/bin/env python
# coding: utf-8


# In[1]:


#2
import datetime
from datetime import date
from datetime import datetime
from dateutil import relativedelta


# In[2]:


#input Data
no_ktp = input("Masukkan nomor KTP anda: ")
nama_penduduk = input("Masukkan nama anda: ")


# In[14]:


#Tanggal lahir
def bday(x):
  hari = int(x[6:8])
  tahun = int(x[10:12])
  bulan = int(x[8:10])
  if hari > 40:
      hari = hari - 40

  if tahun > 21:
    tahun = tahun + 1900
  else:
    tahun = tahun +2000
  ultah = datetime.datetime(tahun, bulan, hari)
  ultah2 = ultah.strftime("%d %B %Y")
  return ultah2
def age(z):
  umur3 =""
  hari = int(z[6:8])
  tahun = int(z[10:12])
  bulan = int(z[8:10])
  if hari > 40:
      hari = hari - 40

  if tahun > 21:
    tahun = tahun + 1900
  else:
    tahun = tahun +2000 
    
#menghitung umur
  today = date.today()
  tgl_lahir = datetime.datetime(tahun, bulan, hari)
  hari_ini = datetime.datetime.now()
  diff = relativedelta.relativedelta(hari_ini, tgl_lahir)
  tahun2 = diff.years
  hari2 = diff.days 
  bulan2 = diff.months
  umur3 = '{} tahun {} bulan {} hari'.format(tahun2,bulan2, hari2)
  return umur3

#enkripsi kode unik
def enkripsi(teks, umur):
    kode =""
    line = teks.replace(' ','')
    raw = line[0:5]+bday(no_ktp).replace(' ','')
    for x in range(len(raw)):
        char = raw[x]
        if (char.isupper()):
            kode += chr((ord(char) + 7-65) % 26 + 65)
        else:
            kode += chr((ord(char) + 7-97) % 26 + 97)
    return kode

datapend = {}
datapend.update({"no ktp": no_ktp,
                "nama penduduk": nama_penduduk,
                "umur": age(no_ktp),
                "kode unik": enkripsi(nama_penduduk, no_ktp)})

print("Selamat datang", datapend['nama penduduk'])
print("Tanggal lahir anda adalah : ", bday(no_ktp))
print("Umur anda adalah : ", datapend['umur'])
print("Gunakan kode unik berikut untuk mengakses data anda di masa depan : ", datapend['kode unik'])
print("Terima kasih!")


# In[ ]:





from bs4 import BeautifulSoup
import requests

# Setup Bahan
select = str(input("USD, EUR, OR JPY: "))
idr = int(input("Masukkan nilai dalam IDR: "))
url = ["https://www.x-rates.com/table/?from=USD&amount=1", 
        "https://www.x-rates.com/table/?from=EUR&amount=1",
        "https://www.x-rates.com/table/?from=JPY&amount=1"]


# Pemilihan Jalur
if select == "USD":
    url = url[0]
elif select == "EUR":
    url = url[1]
elif select == "JPY":
    url = url[2]

exchanges = []

# Membuka url dan mengumpulkan data
text = requests.get(url)
soup = BeautifulSoup(text.content, 'lxml')

for tr_tag in soup.find_all('tbody')[1]:
    try:
        td_tags = tr_tag.find_all('td')
        exchanges.append([td_tags[0].text, td_tags[1].text, td_tags[2].text])
    except:
        pass


# Output
if select == "USD":
    currency = exchanges[19]
    print(f"Nilai Rp{idr} adalah ${idr * float(currency[2])}")
elif select == "EUR":
    currency = exchanges[18]
    print(f"Nilai Rp{idr} adalah €{idr * float(currency[2])}")
elif select == "JPY":
    currency = exchanges[19]
    print(f"Nilai Rp{idr} adalah ¥{idr * float(currency[2])}")





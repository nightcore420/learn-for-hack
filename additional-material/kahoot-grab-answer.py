import urllib.request as link
import json
print("======================")
print("Kahoot auto get answer")
print("by nicemare")
print("======================")
quizid = input("Quiz id: ")
url = "https://play.kahoot.it/rest/kahoots/" + quizid
q = json.loads(link.urlopen(url).read())["questions"]
warna = ["red", "blue", "yellow", "green"]

for index, slide in enumerate(q):
    if slide.get("type") == "quiz":
        for i in range(len(slide.get("choices"))):
            if slide["choices"][i]["correct"]:
                warna_list = warna[:2][::-1] if len(slide.get("choices")) == 2 else warna
               
                print("--------------------------------------------")
                print("[+] Soal No : {}\n{}{}".format(   
                    index + 1,"[+] Jawaban : ", slide["choices"][i].get("answer"),      
                    print("[+] Warna Jawaban : ", warna_list[i])))

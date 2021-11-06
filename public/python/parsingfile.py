import os,re
import urllib.request as req
from bs4 import BeautifulSoup
import urllib
import requests

url = "https://blog.naver.com/"
hdr = {'User-Agent': 'Mozilla/5.0'}
url = urllib.request.Request(url, headers = hdr)


savename = "./public/data/blogParsing.html"
dirname = os.path.dirname(savename)

if not os.path.exists(dirname):
    os.makedirs(dirname)
if not os.path.exists(savename):
    req.urlretrieve(url, savename)
    print("success_xmldownload")

#xml
#res = req.urlopen(url).read()
#with open(savename ,"wb") as fp:
#    fp.write(res)
#    print("저장완료")
#data = res.decode("utf-8")

#f = open(savename, "r", encoding="utf-8")
#soup = BeautifulSoup(f, "html.parser")

#html
#with open(savename, "r", encoding="utf-8") as ffp:
#    soup = BeautifulSoup(ffp, "html.parser")
#    print("parsing success!")

f1 = open('./public/data/PartParsing.html', "r", encoding="utf-8")
soup = BeautifulSoup(f1, "html.parser")
Ids = soup.find_all(['a'])
#userCate = ['1','2']
#f_userCate_path = '<my project folder>/public/txt/userFiles.txt'
#dirname_userCate = os.path.dirname(f_userCate_path)
#if not os.path.exists(dirname_userCate):
#    os.makedirs(dirname_userCate)
#f_userCate = open(f_userCate_path, "w")
#for i in range(len(userCate)):
#    f_userCate.write(userCate[i]+"\n")
#f_userCate.close()

regex_a = re.compile('^category/[0-9]{1,3}$/g')
print("type(re.compile)=>{}".format(type(re.compile)))

for a_list in Ids:
    matchedobj_a = regex_a.findall(a_list.attrs['id'])
    try:
        print("-------------")
        id_a_list= a_list.find(['id'])
        print("id_a_list=>{}".format(id_a_list))
    except parseError:
        pass
    if matchedobj_a:
        #print(matchedobj_a.group(0))
        cond = {"id":matchedobj_a}
        IdTag = soup.find_all("a", cond)
        print("IdTag=>{}".format(IdTag))
        print("type(IdTag)=>{}".format(type(IdTag)))

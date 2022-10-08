#simple progressbar 
from time import sleep
from tqdm.auto import tqdm

for i in tqdm(range(10000)):
    sleep(0.001)

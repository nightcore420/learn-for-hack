import platform

# If on windows, you import winsound, or better yet,just use linux
if platform() == "MacOS":
    try:
        import os
    except:
        print("OS module not available.")    


winsound.PlaySound("C:/Users/muham/Documents/Pemrograman/Python/Program/Space_Invader/laser.wav", winsound.SND_ASYNC)


#Only for practice, "sound_file" name should be ur music name
def play_sound(sound_file, time = 0):
    # Windows
    if platform.system == "Windows":
        winsound.PlaySound(sound_file, SND_ASYNC)
    # Linux
    if platform.system == "Linux":
        os.system("aplay -q {}&".format(sound_file))
    #MacOS
    else:
        os.system("afplay {}&".format(sound_file))

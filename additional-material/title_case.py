def title_case(title, minor_words=''):
    result = []
    # Convert to lower all string and split
    title = title.lower().split(' ')
    minor_words = minor_words.lower().split(' ')

    for i, word in enumerate(title):
        if i != 0:
            print(minor_words.count(word))
            if minor_words.count(word) == 0:
                result.append(word.capitalize())
            else:
                result.append(word)
        else:
            result.append(word.capitalize())


    return ' '.join(result)
    
print(title_case(''), '')
print(title_case('a clash of KINGS', 'a an the of'), 'A Clash of Kings')
print(title_case('THE WIND IN THE WILLOWS', 'The In'), 'The Wind in the Willows')
print(title_case('the quick brown fox'), 'The Quick Brown Fox')
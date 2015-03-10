
numDict = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
lastNumDict = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2]

def extendCardnum(cardnum):
    cardList = []
    for i in range(10):
        for j in range(10):
            for k in range(10):
        	    for u in range(10):
        	    	cardList.append(cardnum+str(i)+str(j)+str(k)+str(u) )
    return cardList

def checkCardnum(cardnum):
	sum = 0
	for i in range(17):
		#print "cardnum"+cardnum+" i"+str(i)
		sum = sum + int(cardnum[i]) * int(numDict[i])
        if lastNumDict[sum % 11] == int(cardnum[17]):
        	return True


if __name__ == '__main__':
	originCard = "62270119890218"
	#print extendCardnum(originCard)
	for card in extendCardnum(originCard):
		if checkCardnum(card) is True:
			print card
	
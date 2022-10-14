# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
while True:

    account_sid ='AC84dee919cfa8bce5b9ff1cb805f6df64' 
    auth_token = '998f90990f0a60c34998cc0a11efb3fa'
    client = Client(account_sid, auth_token)



    text = "Sami loves you the most and always will , my wife my everything ❤️ "
    message = client.messages \
                    .create(
                         body= f"{text}",
                         from_='+12058906921',
                         to='+989960950834'
                 )

    print(message.sid)


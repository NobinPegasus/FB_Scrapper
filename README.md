# FB_Scrapper
A basic tool to scrape FB Usernames and Public posts.


-----------------
Tools: Puppeteer


----------------
Details:
This is a basic tool which utilizes headless browser to automatically login using the credentials I provides in credential file. It then searches the facebook with the name we provide as arguement in our command. Then it stores Usernames and profileUrls into a csv. Another thing it does is it goes through the profileUrls and finds the first public id. It then scrolls and fetches the public posts of that person. 
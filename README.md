# FB_Scrapper
A basic tool to scrape FB Usernames and Public posts.


-----------------
Tools: Puppeteer

Requirement: node, csv-write, puppeteer

----------------
Details:
This is a basic tool which utilizes headless browser to automatically login using the credentials I provides in credential file. It then searches the facebook with the name we provide as arguement in our command. Then it stores Usernames and profileUrls into a csv. Another thing it does is it goes through the profileUrls and finds the first public id. It then scrolls and fetches the public posts of that person. 


##### Building the docker image

```
sudo docker build -t my_scrapper . #It build the docker image and names it my_scrapper 
sudo docker run -it my_scrapper "Zeshan Ahmed Nobin" #It run the created my_scrapper image with "Zeshan Ahmed Nobin" as arguements and -it gives interactive tty

```
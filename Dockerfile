FROM node:18

WORKDIR /app

COPY fb_scrapper.js .
COPY creds2.js .

# Install dependencies
RUN apt-get update \
    && apt-get install -yq libgconf-2-4 \
    && apt-get install -yq libnss3-dev \
    && apt-get install -yq libatk-bridge2.0-0 \
    && apt install -yq libgtk-3-0 \ 
    && apt-get install -yq libasound2 \
    libdrm2 \
    libice6 \
    libsm6 \
    && apt-get install -y libgbm-dev \
    && apt-get install -yq libnss3 \
    && apt-get install -yq libxss1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get install libgconf-2-4 


RUN npm install csv-writer
# RUN npm install
RUN npm install puppeteer

# Set entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]



# Set default command to run the scraper with arguments
CMD ["node", "fb_scrapper.js", "UserName"]
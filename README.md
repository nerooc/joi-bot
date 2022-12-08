![image](https://user-images.githubusercontent.com/31045802/206223046-e853baa6-11df-467d-b711-1033378b17f8.png)

<img align="left" src="https://user-images.githubusercontent.com/31045802/206223512-8458cbe6-120d-4759-9382-2682eff7133a.png" alt="drawing" width="50%"/>

**JOI** is a Discord bot based on the character from the movie **Blade Runner**. It is written in Typescript and uses the Discord.js library to interact with the Discord API. 

The bot can be run in a Docker container and currently it is hosted on Google Cloud Platform using GCE.

## Features
 &nbsp;- **Song request and queueing**: users can request songs to be played in the Discord voice channel. The bot maintains a queue of songs and plays them in order.
 
 &nbsp;- **OpenAI chat integration**: users can chat with the bot using natural language, and the bot will respond using the OpenAI chat engine.
 
 &nbsp;- **Utility functions**: the bot also provides some useful utility functions, such as the ability to look up information on Wikipedia or search for images on the web.

## Usage
To use the JOI bot, you must first invite it to your Discord server. You can do this by going to the bot's page on the Discord website and clicking the "Invite" button.

Once the bot is on your server, you can use the /help command to see a list of all available commands and their usage.

## Hosting
The JOI bot can be run in a Docker container, which makes it easy to deploy and run on any platform that supports Docker. 


To host the bot on Google Cloud Platform, you can use the GCE or GKE to manage the deployment and scaling of the bot. This will ensure that the bot is always available and can handle a large number of users without downtime.

## Deployment architecture
 &nbsp;- The bot's code will be automatically packaged into a container using Google Cloud Build, which will pull the latest version of the code directly from the Github repository.
 
 &nbsp;- The container will be stored in Google Cloud Container Registry, from where it can be easily deployed onto a virtual machine created with Google Cloud Engine.
 
 &nbsp;- Once the machine is up and running, Google Cloud Monitoring will keep an eye on it to make sure everything is working smoothly. This way, we can make sure that the bot is always available and responding to requests.

## License
JOI is licensed under the terms of the MIT License.


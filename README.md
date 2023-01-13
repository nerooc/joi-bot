![image](https://user-images.githubusercontent.com/31045802/206223046-e853baa6-11df-467d-b711-1033378b17f8.png)


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

![joi-architecture](https://user-images.githubusercontent.com/31045802/212212990-0071ced6-54c1-4647-a4eb-191a8b36e965.png)

 &nbsp;- The bot's code will be automatically packaged into a container using Google Cloud Build, which will pull the latest version of the code directly from the Github repository.

![image](https://user-images.githubusercontent.com/31045802/212260073-f83b579b-dff6-43c1-9915-22c60f8259cc.png)
 
 &nbsp;- The container will be stored in Google Cloud Container Registry.

![image](https://user-images.githubusercontent.com/31045802/212259835-32aded60-2ab6-4780-9c7f-f07d02e82ce8.png)

 &nbsp;- Then it can be easily deployed onto a virtual machine created with Google Cloud Engine.

![image](https://user-images.githubusercontent.com/31045802/212259979-fe9bdb69-0f79-4ef4-93c4-cf94aed356d8.png)

 &nbsp;- Once the machine is up and running, Google Cloud Monitoring will keep an eye on it to make sure everything is working smoothly. This way, we can make sure that the bot is always available and responding to requests. There are special dashboards created to monitor the state of GCE VMs:
 
![image](https://user-images.githubusercontent.com/31045802/212258430-25163480-f5b5-4820-889b-dd31dc975d0b.png)

Also added specific alert policies to notify the owner of the project by e-mail if CPU will exceed given threshold:
![image](https://user-images.githubusercontent.com/31045802/212257710-e61e1d2a-4e96-4a7e-8e96-d41dae24b9b0.png)
  


## License
JOI is licensed under the terms of the MIT License.


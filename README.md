# Swiss Chat
> This is a chat app that works in real time. it has both personal chat and group chat.
> The group chat is created by admin users can be able to join the group chat.
> It contains some features like: file, video, image and audio upload, online presences, realtime search, realtime chat, userprofile and more.
> This app also uses stimulusjs to interact with the UI.
> More features would add to the application.

## Built With

- Javascript ES6
- Ruby 3.1.2
- Rails 7
- postgresql
- Stimulus js
- Tailwindcss
- Actioncable
- Turbo streams
- ActiveStorage
- Remixicon

## How to Install
- Open your terminal or command prompt.

- Navigate to the directory where you want to clone the project. Use the cd command followed by the desired directory path.

- Clone the GitHub repository by running the following command:
    ``` 
   git clone https://github.com/chinweokwu/SwissChat.git
    ``` 
- Change into the cloned project directory:
    ``` 
   cd SwissChat
- Install the dependencies:
    ``` 
       bundle install

- Create the database:
    ``` 
    rails db:create
    ``` 
- Migrate the database:
    ``` 
    rails db:migrate
    ``` 
- Precomipile assets: Since the project uses Tailwind CSS, you'll need to compile the CSS files.
    ```
    rails assets:precompile

- Run the server:
    ``` 
   rails s
    ``` 


## How to an admin
- rails c
  User.create(username:"admin1", email: 'admin1@example.com', password: 'password', password_confirmation: 'password')
  user.role = "admin"
  user.save
- Run the server and login in with the credential above and created rooms. 


## Author  ![Hireable](https://img.shields.io/badge/HIREABLE-YES-yellowgreen&?style=for-the-badge)

👤 **Paul chinweokwu Morah**
- Github: [@paulmorah](https://github.com/chinweokwu)
- Twitter: [@Morah89820846](https://twitter.com/Morah89820846)
- Linkedin: [Paul Chinweoku Morah](https://www.linkedin.com/in/morah-paul/)

## Acknowledgment

This app is inspire by the [codeperfectionist](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!. Feel free to check the [issues page](https://github.com/chinweokwu/Alx-Gorilla-fitness/issues).

## Show your support

Give a ⭐️ if you like this project!

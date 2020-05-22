# **SaySL Signchat Microservice**

A microservice created as part of the CS492 at Bilkent University. This microservice handles user authentication and video upload for the SignChat feature.

The API is now online [here](https://saysl-signchat.herokuapp.com/).

## **Endpoints**

*  GET `/` 
    *  Displays the login page

*  POST `/login`
    *  Logs user in
    * `Body: { email: String, password: String}`

*  GET `/register` 
    *  Displays the sign-up page
    
*  POST `/register`
    *  Registers a new user
    * `Body: { email: String, password: String, name: String, dob (Date of birth): Date}`

* POST `/chats/sendMessage`
    * Sends a message from user X to user Y
    * `Body: { sender: String, receiver: String, content: String}`
    * **sender**: Firebase unique user ID of X
    * **receiver**: Firebase unique user ID of Y
    * **content**: message content
    * **example:**
        * "receiver": "UlrXRNuR5McgMVVACerMHgLXv412", 
        * "sender": "YOC6hLno9dTN4UnB5COWafsp4cV2",
        * "content":  "This is a test message from X to Y"
    

*  GET `/video-upload` 
    *  Displays the page where we can upload videos (only for browsers - testing)

*  POST `/video-upload`
    *  Uploads a video to cloud
    * `Body: { filepath}`
    * Not really sure how this is going to work for android application
    
*  GET `/logout` 
    *  Log users out

* POST `/update-name`
    * Updates displayName property of user
    * Example JSON payload:
        * `{`
        * `   "name": "Example Name"`
        * `}`
        
* POST `/update-email`
    * Update email of user
    * Example JSON payload:
        * `{`
        * `   "email": "example@example.com"`
        * `}`
* POST `/update-password`
    * Update password of user
    * Example JSON payload:
        * `{`
        * `   "password": "xxxxxxxx"`
        * `}`

* POST `/reset-password`
    * Sends a password reset email to the user
    * Example JSON payload:
        * `{`
        * `   "email": "example@example.com"`
        * `}`
    * Response
        * Email sending successful: `200 OK`
        * Email sending unsuccesful: `500 Internal Server Error`


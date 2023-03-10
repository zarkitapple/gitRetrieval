Steps:

You need to have nodejs installed on your system
https://nodejs.org/es/

1. Create token from Github
2. Create .env file with the following format
    ```
    GITHUB_TOKEN=<token>
    EXERCISE_ID=<exerciseNumber>
    ```
3. Run npm install
4. node . If argument --dry-run is passed, it will only print the result, otherwise it will create and download the files
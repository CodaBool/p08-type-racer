# Available Templates (branch-name)
- react to heroku deploy (react-heroku)
- next to heroku deploy (next-heroku)
- express serverless (express)
- python serverless (python)
- vite react (vite)
- sls-website-next (could be used for both simple and lambda next.js projects)

# Serverless Installation
This requires serverless cli [get started](https://www.serverless.com/framework/docs/providers/aws/cli-reference/)

sls create -u https://github.com/CodaBool/sls-express-template/tree/main -n [FOLDER_NAME]

cd [FOLDER_NAME]

code . (edit app in serverless.yml)

create an .env file

npm i

sls deploy

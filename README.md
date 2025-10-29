# DevTinder

- create devtinder web vite react project
- install tailwind
- git init
- install daisy UI
- add navbar in App.js from daisyUI
- Navbar separate
- npm i react-router-dom (for frontend routing)
- create BrowserRouter > Routes >Route=/Body > RouteChildren
- Create an Outlet in Body component
- create Footer
- create login Page
- npm i axios
- CORS - npm i cors in backend => add middleware to configurations:origin,credentials
- Making API call Axios => withcredentials:true
- Install redux and setup redux store
  - npm install @reduxjs/toolkit
  - npm install react-redux
- Add Redux DevTolls in chrome
- Lohin and the see the data coming properly in store
- Navbar should Upadte as soon as user logs in
- Refactor the code add constants file and create components folder
- Not be access to ther routes without login
- if token is not present ,redirect to login page
- Logout Feature
- Get the feed and add the feed in store
- Build the user card on feed
- Edit profile feature
- Show Toast message on save of profile
- New page - see all my Connections
- New page - see all my Connections Request
- Feature -Accepted Rejected Connection Request
- Send/Ignore the user from the feed
- SignUp New User
- E2E Testing

Navbar
Route=/ =>Feed
Route=/login=>Login
Route=/connections=>connections
Router=/profile =>Profile

# Routes

- create body component
- three component in body navbar,<Outlet>(routing the children),Footer
- setup routing in App.js component <BrowserRoute> </BrowserRoute>
  - in browserroute call <rotutes/><rotutes/>
    - in routes call route for giving path and element <Route></Route>(add many parent route)
      - Add chlid router (add one or more children)

# Deployment

- Signup on AWS
- Launch instance
- chmod 400<secret>.pem
- "ssh -i "devTinder.pem" ubuntu@ec2-13-51-168-100.eu-north-1.compute.amazonaws.com
- install node version same as on pc running
- install npm version same as on pc
- Clone the git repositories on AWS server
- Frotened
  - npm install ->dependncies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist -->devtinder-web--> /var/www/html/
  - For copy dist folder --> sudo scp -r dist/\* /var/www/html/
  - Enable port 80 of instance
- Backend
  - Upadte password
  - allowed ec2 instance public IP on mongoDB server
  - Installed npm install pm2 -g
  - pm2 start npm -- start
  - pm2 list,pm2 flush <name >, pm2 stop <name >,pm2 delete <name>
  - pm2 logs
  - config nginx -/etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api

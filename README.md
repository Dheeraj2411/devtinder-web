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
Bdoy
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

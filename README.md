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

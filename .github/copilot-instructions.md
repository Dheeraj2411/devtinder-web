## Quick context (what this project is)

- Vite + React app (entry: `src/main.jsx`, main component `src/App.jsx`).
- UI uses Tailwind CSS + DaisyUI (see `package.json` deps).
- Client-side routing with React Router (routes declared in `src/App.jsx`; top-level route element is `Body`).
- Global state with Redux Toolkit. Store is configured in `src/utils/appStore.js` with reducers: `user`, `feed`, `connection`, `request`.
- Axios is used for API calls; base URL is `src/utils/constants.js` (currently `http://localhost:7777`) and requests include `{ withCredentials: true }`.

## How to run (developer commands)

- Start dev server: `npm run dev` (runs `vite`).
- Build: `npm run build`.
- Preview production build: `npm run preview`.
- Lint: `npm run lint`.

## High-level architecture & important files

- Entry: `src/main.jsx` — wraps `App` in React StrictMode.
- App & routing: `src/App.jsx` — sets up `Provider` (Redux store) and `BrowserRouter` with child routes mounted under `<Body />`.
- Store: `src/utils/appStore.js` — combine reducers: `user`, `feed`, `connection`, `request`.
- Slices: `src/utils/*Slice.js` — implement the state shape and reducers (examples: `userSlice.js`, `feedSlice.js`).
- Constants: `src/utils/constants.js` — `BASE_URL` for API calls.
- Example components:
  - `src/components/NavBar.jsx` — reads `store.user`, handles logout via POST to `/logout`, dispatches `removeUser()` and navigates to `/login`.
  - `src/components/UserCard.jsx` — sends requests to `BASE_URL + /request/send/:status/:userId` and dispatches `removeFeed(user._id)` on success.

## Project-specific conventions & patterns (actionable)

- Redux slices commonly replace entire slice state with payload (e.g., `addFeed: (state, action) => action.payload`). Many slices initialize with `initialState: null`.
  - Practical implication: guard against `null` before using array methods — e.g., `feed` reducers assume an array (`state.filter`) which will throw if state is `null`.
- Accessing store: components use `useSelector(store => store.user)` and `useDispatch()` to call actions exported from `src/utils/*Slice.js`.
- API calls: always use axios with `{ withCredentials: true }` to support cookie-based auth (backend expected to enable CORS with credentials).

## Known fragile areas / gotchas (from current code)

- Many slices set `initialState` to `null` but subsequent reducers expect arrays/objects. When changing slices or adding selectors, add null checks or normalize initial states to [] or {} where appropriate.
- `UserCard.jsx` currently defines `sendRequest` inside a `try { ... }` block at module render time. The try/catch is misplaced (it wraps the function declaration, not the async call). When modifying this component, move error handling inside the async function or around calls.

## Typical change patterns & examples for AI edits

- To add a new route: update `src/App.jsx` by adding a `<Route path="/new" element={<NewComponent/>}/>` as a child of the `Body` route. Put the component in `src/components/`.
- To add API features: create calls using `axios` + `BASE_URL` and `{ withCredentials: true }`. Example:

  - POST to backend with cookies:
    - `await axios.post(BASE_URL + '/some/endpoint', payload, { withCredentials: true })`

- To update global state: modify or add reducers in `src/utils/*Slice.js` and export actions. Update `src/utils/appStore.js` only if you add a new slice.

## Integration points / external dependencies

- Backend: `BASE_URL` (`http://localhost:7777`). Endpoints visible in code: `/logout`, `/request/send/:status/:userId`, and others referenced across components.
- Dev tools: Redux DevTools expected for store debugging (standard RTK store config).

## Useful files to inspect before edits (quick checklist)

- `src/App.jsx` — routing & Provider wiring
- `src/utils/appStore.js` — combined reducers
- `src/utils/{user,feed,connection,request}Slice.js` — action shapes and initial state
- `src/utils/constants.js` — `BASE_URL`
- `src/components/NavBar.jsx`, `src/components/UserCard.jsx` — examples of axios usage and store interactions

## Prompt tips for the agent working on this repo

- “When adding or changing reducers, ensure initialState is compatible with reducers (avoid null/array mismatches).”
- “Use axios with `withCredentials: true` and `BASE_URL` from `src/utils/constants.js` for all API calls.”
- “Check `src/App.jsx` routes and add new routes as children of the `Body` route.”
- “Run `npm run dev` to test locally; `npm run lint` before PR.”

---
If any section is unclear or you'd like me to include example snippets for a specific change (e.g., adding a slice or a route), tell me which area and I'll expand or iterate.

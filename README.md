### Jam Pack
This is a Fullstack Academy solo student project (Stackathon) put together in less than a week.  The purpose was to explore the usage of new Node.js libraries (in this case [Three.js](https://github.com/mrdoob/three.js/) and [binpacking.js](https://github.com/olragon/binpackingjs)) and build a demoable app using the Node/Express/React/Postgres stack.

### Run it locally
#### Requirements: 
- Node v14
- Postgresql v13

#### Setup
1) If you have the postgres cli tools, create the seed database: <br>
```createdb jampack_db ```
2) Install the node dependencies:<br>
```npm i```
3) Create local dummy JWT secret:<br>
```npm run setup:dev```
4) Run the app:<br>
```npm run start:dev```
5) Open your browser:<br>
http://localhost:3000
6) Login with the seeded dummy user account:<br>
username: foo@bar.com<br>
password: foobar<br><br>
or create a new one using the sign up!

7) Kill the app with <CTRL+c>

### demo deploy
https://jampack-demo.herokuapp.com

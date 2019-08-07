# Social Network Project

### A social network for developers around the world

**Website:** https://devnetwork-2019.herokuapp.com/ 

## Getting Started

1. Clone or download the repository
2. Move into the project directory
3. Install npm dependencies of node.js using `` npm install ``
4. Move into client directory `` cd client ``
5. Install npm dependencies of react.js using `` npm install `` 
6. In root directory create *keys_development.js* file connect your database
```
module.exports = {
    mongoURI: "your online database URI",
    JwtSecretKey: "your jwt secret key"
}

```
7. Start development using `` npm run dev ``
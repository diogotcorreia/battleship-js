# battleship-js

A Battleships game made with React and Socket.io.

Hosted on [battleships.diogotc.com](https://battleships.diogotc.com/).

## Deployment

```bash
git clone https://github.com/diogotcorreia/battleship-js.git
cd battleship-js
yarn
cd client
yarn
REACT_APP_SOCKET_URL=http://localhost:5000/ yarn build
cd ..
PORT=5000 yarn start
```

const Player = require('./Player');

function Game(id) {
  this.id = id;
  this.createdTime = Date.now();
  this.player1 = null;
  this.player2 = null;
  this.turn = false; // false = player1, true = player2

  this.addPlayer = (id, ships) => {
    if (!this.player1) this.player1 = new Player(id, ships);
    else if (!this.player2) this.player2 = new Player(id, ships);
    else return false;
    return true;
  };

  this.removePlayer = (id) => {
    if (!!this.player1 && this.player1.id === id) this.player1 = null;
    if (!!this.player2 && this.player2.id === id) this.player2 = null;
  };

  this.hasPlayer = (id) => {
    return (!!this.player1 && this.player1.id === id) || (!!this.player2 && this.player2.id === id);
  };

  this.getOpponent = (id) => {
    if (!!this.player1 && this.player1.id === id) return player2;
    return player1;
  };

  this.isFull = () => !!this.player1 && !!this.player2;

  this.startGame = (socket) => {
    socket.to(`room-${this.id}`).emit('start_game');
    socket.to(this.player1.id).emit(
      'add_to_board',
      'own',
      this.player1.board.reduce((result, v, x) => {
        result.push(
          ...v.reduce((result, v, y) => {
            if (v !== 0) result.push({ x, y, value: v });
            return result;
          }, [])
        );
        return result;
      }, [])
    );
    socket.to(this.player2.id).emit(
      'add_to_board',
      'own',
      this.player2.board.reduce((result, v, x) => {
        result.push(
          ...v.reduce((result, v, y) => {
            if (v !== 0) result.push({ x, y, value: v });
            return result;
          }, [])
        );
        return result;
      }, [])
    );
  };
}

module.exports = Game;

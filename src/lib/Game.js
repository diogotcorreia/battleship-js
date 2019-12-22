const Player = require('./Player');
const SlotStatus = require('./SlotStatus');

function Game(id, io, removeGameHandler) {
  this.id = id;
  this.io = io;
  this.createdTime = Date.now();
  this.player1 = null;
  this.player2 = null;
  this.turn = Math.random() >= 0.5; // false = player1, true = player2; random first turn

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
    if (!!this.player1 && this.player1.id === id) return this.player2;
    return this.player1;
  };

  this.isFull = () => !!this.player1 && !!this.player2;

  this.startGame = () => {
    this.io.to(`room-${this.id}`).emit('start_game');
    const sendStartingBoard = (player) => {
      this.io.to(player.id).emit(
        'add_to_board',
        'own',
        player.board.reduce((result, v, x) => {
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
    sendStartingBoard(this.player1);
    sendStartingBoard(this.player2);
    this.sendTurnData();
  };

  this.sendTurnData = () => {
    this.io.to(this.player1.id).emit('turn_data', !this.turn);
    this.io.to(this.player2.id).emit('turn_data', this.turn);
  };

  this.handlePlay = (playerId, play) => {
    // Check if play is legal
    if (this.player1.id === playerId) {
      if (this.turn) return;
    } else if (!this.turn) return;

    this.turn = !this.turn;
    const opponent = this.getOpponent(playerId);
    switch (opponent.board[play.x][play.y]) {
      case SlotStatus.SHIP_NOT_FOUND:
      case SlotStatus.SHIP_DOWN:
        opponent.board[play.x][play.y] = SlotStatus.SHIP_DOWN;
        break;
      default:
        opponent.board[play.x][play.y] = SlotStatus.WATER;
    }
    const changes = opponent.checkSunkShips();
    this.io
      .to(playerId)
      .emit('add_to_board', 'opponent', [
        { ...play, value: opponent.board[play.x][play.y] },
        ...changes,
      ]);
    this.io
      .to(opponent.id)
      .emit('add_to_board', 'own', [
        { ...play, value: opponent.board[play.x][play.y] },
        ...changes,
      ]);
    this.sendTurnData();

    if (opponent.availableShips.length === 0) this.handleGameEnd(playerId);
  };

  this.handleGameEnd = (winner) => {
    this.io.to(this.player1.id).emit('game_end', winner === this.player1.id);
    this.io.to(this.player2.id).emit('game_end', winner === this.player2.id);
    removeGameHandler(this.id);
  };
}

module.exports = Game;

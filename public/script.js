// The client-side javascript
/*
This code will probably be very messy, as i'm not too familiar 
with socket.io and things like it.
*/

var socket = io();
// If your IDE says that io is not defined, dont worry about it, we import socket.io in the index.html

class Game {
  constructor(){
    this.socket = socket;
    this.state = 1;
    /*
    Game states:
    1: Waiting for pin to be entered
    2: Waiting for name to be entered
    3: Waiting for game to start
    
    4, 5, and 6 will rotate once the game starts
    
    4: waiting for question
    5: waiting for player to answer question
    6: player answered question, waiting for results to be shown and next one to start
    */
  }
  setState(which){
    
  }
}
// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function() {
      if(this.length === 1) {
        this.playFirst();
      }
    }, this);

    this.on('ended', function() {
      this.at(0).dequeue();
    }, this);

    this.on('dequeue', function(song) {
      if (this.length === 1) {
        $('audio').attr('src', "");
      }
      this.remove(song);
      if(this.length > 0) {
        this.playFirst();
      } 
    }, this);
  },

  playFirst: function(){
    this.at(0).play();
    startVisualize(); 
  }
});
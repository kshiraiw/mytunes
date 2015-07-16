// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.collection.on('add', this.render, this);
    this.collection.on('remove', this.render, this);
    this.render();
  },

  attributes: {
    class: "songQueue"
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.html('<th colspan="2">Song Queue</th>');
    if(this.collection.length > 0) {
      this.$el.append(
        this.collection.map(function(song){
          return new SongQueueEntryView({model: song}).render();
        })
      );
    }
  }

});

// // SongQueueView.js - Defines a backbone view class for the song queue.
// var SongQueueView = Backbone.View.extend({

//   tagName: "table",

//   initialize: function() {
//     this.render();
//     console.log(this.models);
//     this.on('add', this.addOne, this.models);
//   },

//   addOne: function(){
//     console.log('we are triggering');
//     this.songEntry = new SongQueueEntryView({model: _.last(this.collection)});

//     return this.$el.append(this.songEntry.render());
//   },

//   render: function(){
//     // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
//     // see http://api.jquery.com/detach/
//     this.$el.children().detach();

//     this.$el.html('<th>Song Queue</th>');

    
//   }

// });

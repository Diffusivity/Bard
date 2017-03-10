(function() {
  var audio = new Audio(),
      spotifyApi = new SpotifyWebApi();
audio.volume= 0.5 ;
  function playSong (songName, artistName) {
    var query = songName;
    if (artistName) {
      query += ' artist:' + artistName;
    }
    spotifyApi.searchTracks(query).then(function(response) {
      if (response.tracks.items.length) {
        var track = response.tracks.items[0];
        audio.src = track.preview_url;
        audio.play();
        communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
      }
    });
  }

  function communicateAction (text) {
    var rec = document.getElementById('conversation');
    rec.innerHTML = '<div class="action">' + text + '</div>';
  }

  function recognized (text) {
    var rec = document.getElementById('conversation');
    rec.innerHTML = '<div class="recognized"><div>' + text + '</div></div>';
  }

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'stop': function() {
        audio.pause();
      },
        'set volume to *level (percent)': function(level) {
        audio.volume = (level/100); 
       recognized('volume set to ' + ((audio.volume)*100)+'%');
      },
      '(turn) volume up': function() {
        audio.volume += 0.1;
          recognized('volume raised to ' + ((audio.volume)*100)+'%');
      },
        '(turn) volume down': function() {
        audio.volume -= 0.1;
        recognized('volume lowered to ' + ((audio.volume)*100)+'%');
      },
      'play track *song': function(song) {
        recognized('Play track ' + song);
        playSong(song);
      },
      'play *song by *artist': function(song, artist) {
        recognized('Play song ' + song + ' by ' + artist);
        playSong(song, artist);
      },
      'play song *song': function(song) {
        recognized('Play song ' + song);
        playSong(song);
      },
      'play *song': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'let\'s hear *song': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'give me *song': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'I need *song': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'How about *song': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
        'let\'s hear *song by *artist': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'give me *song by *artist': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'I need *song by *artist': function(song) {
        recognized('Play ' + song);
        playSong(song);
      },
'How about *song by *artist': function(song) {
        recognized('Play ' + song);
        playSong(song);
      ':nomatch': function (message) { recognized(message); communicateAction('Sorry, I don\'t understand this action'); }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }

  annyang.addCallback('error', function() { communicateAction('error'); });
})();
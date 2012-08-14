function oauth_request(url, params) {
  var message = {
    "method": "GET",
    "action": url,
    "parameters": {
      "oauth_signature_method": "HMAC-SHA1",
      "oauth_consumer_key": OAUTH_CONSUMER_KEY,
      "oauth_token": OAUTH_ACCESS_TOKEN
    }
  };

  for (var key in params) {
    message.parameters[key] = params[key];
  }

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, {
    "consumerSecret": OAUTH_CONSUMER_SECRET,
    "tokenSecret": OAUTH_ACCESS_TOKEN_SECRET
  });

  return OAuth.addToURL(message.action, message.parameters);
}

function get_users() {
  var user_ids_url = oauth_request(
    "https://api.twitter.com/1/friends/ids.json",
    { "screen_name": "kinjou_j" }
  );

  var ids = new Array;

  $.ajax({
    "type": "GET",
    "url": user_ids_url,
    "async": false,
    "dataType": "json",
    "success": function(data) {
      ids = data.ids;
    }
  });

  return ids;
}

function get_user_info() {
  var users = new Array;

  get_users().forEach(function(i) {
    var user_info_url = oauth_request(
      "https://api.twitter.com/1/users/lookup.json",
      { "user_id": i }
    );

    $.ajax({
      "type": "GET",
      "url": user_info_url,
      "async": false,
      "dataType": "json",
      "success": function(data) {
        if (!(data instanceof Array)) {
          return;
        }

        var user = data[0];

        users.push({
          "content": "http://twitter.com/" + user.screen_name,
          "description": user.name
        });
      }
    });
  });

  return users;
}


var users = new Array;
users = get_user_info();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  var suggests = new Array;

  if (users.length > 0) {
    $.each(users, function(i, user) {
      if (text !== undefined && text.length > 0) {
        var regexp = new RegExp('^' + text);

        if(!regexp.test(user.id)) {
          return true;
        }
      }

      suggests.push(user);
    });
  }

  suggest(suggests);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  if (text !== undefined && /^http:\/\/twitter.com\//.test(text)) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.update(tab.id, { "url": text });
    });
  }
});

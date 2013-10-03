Twitter.configure do |config|
  config.consumer_key = ENV['twitterkey']
  config.consumer_secret = ENV['twittersecret']
  config.oauth_token = ENV['twittertoken']
  config.oauth_token_secret = ENV['twittertksecret']
end

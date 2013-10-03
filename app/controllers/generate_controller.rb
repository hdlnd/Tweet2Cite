class GenerateController < ApplicationController
  def index
  end

  def about
  end
  
  def contact
  end

  def gettweet
    @url = params[:id]

    @tweet = Twitter.status(@url)

    if @tweet
      render json: @tweet
    else
      render :json => {:error_message => "Twitter did not return a valid tweet from that url."}
    end

  end
end

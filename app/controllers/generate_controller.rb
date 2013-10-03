class GenerateController < ApplicationController
  def index
  end

  def about
  end
  
  def contact
  end

  def gettweet
    @url = params[:id]

  end
end

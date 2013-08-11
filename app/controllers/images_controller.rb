class ImagesController < ApplicationController
  skip_before_filter :require_login

  def new
    @image = Image.create(params[:image])
    @image.user = User.find(1)
    @image.save
  end


  def search 
    @images = Image.caption_search(params[:search]).results
  end
end

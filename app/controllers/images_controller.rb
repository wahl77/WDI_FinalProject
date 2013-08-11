class ImagesController < ApplicationController
  skip_before_filter :require_login

  def new
    @image = Image.new(params[:image])
    @image.user = current_user
    @image.save
  end

  def update
    @image = Image.find(params[:image_id])
    @image.update_attribute(:caption, params[:caption])
    redirect_to root_url
  end

  def search
    @images = Image.caption_search(params[:search]).results
  end
end

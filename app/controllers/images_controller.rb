class ImagesController < ApplicationController
  skip_before_filter :require_login

  def new
    @image = Image.new
    respond_to do |format|
      format.html # show.html.erb
      format.js
    end
  end


  def create
    @image = Image.create(params[:image])
    @image.user = current_user
    if @image.save
      redirect_to root_path
    else
      render :new
    end
  end

  def update
    @image = Image.find(params[:image_id])
    @image.update_attribute(:caption, params[:caption])
  end

  def search
    @images_array = Image.caption_search(params[:search])
    render json: @images_array.uniq
  end

  def choose_image_location
    @image = Image.find(params[:id])
    @image.update_attributes(:lat => 35, :long => 102)
    redirect_to map_location_url(@image.id)
  end

  def save_location
    @image = Image.find(params[:url].split("/")[-1])
    @image.update_attributes(:lat => params[:lat], :long => params[:lng])
    redirect_to root_url
  end

end

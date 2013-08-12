class StaticPagesController < ApplicationController
  skip_before_filter :require_login, only:[:index, :about]
  def index
    @everyone_images = Image.all
    @user = current_user
    @you_images = current_user.images
  end

  def about
    respond_to do |format|
      format.js { render layout: false }
    end
  end

  # def find_images


  #   # @friends_images = current_user.follows
  #   redirect_to root_path
  # end
end

class StaticPagesController < ApplicationController
  skip_before_filter :require_login, only:[:index, :about]

  def index
    @everyone_images = Image.all
    if current_user
      @user = current_user
      @you_images = current_user.images
      @friends_images = []
      User.find(current_user.id).following.each do |person|
        person_id = person.following_id
        images = User.find(person_id).images
        images.each do |image|
          @friends_images << image
        end
      end
    end
  end

  def about
    respond_to do |format|
      format.js { render layout: false }
    end
  end

end

class UsersController < ApplicationController
  skip_before_filter :require_login

  def show
    @user = User.find(params[:id])
    @image = Image.new
    @users = User.all
    # @users.delete(current_user.followingUsers)
    # @users.delete(current_user)
  end

  def add_follower
    @follow = Follow.create(:follower_id => current_user.id, :following_id => params[:id])
    @user = User.find(@follow.follower_id)
  end
end

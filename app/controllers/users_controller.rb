class UsersController < ApplicationController
  skip_before_filter :require_login, :only => [:index, :new, :create]

  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  def show
    # do not ever get rid of this @from!!!!!!!!!!!!!!!FFFFFUUUUUUUUCCCCCCCKKKKKKKKKKK
    # it is important.
    @from = params[:from]
    @user = User.find(params[:id])
    @image = Image.new
    @users = User.all
    @images = current_user.images
    @users.reject!{ |user| current_user.following.map{|x| x.following}.include?(user)}
    @users.delete(current_user)

    respond_to do |format|
      format.html # show.html.erb
      format.js
    end
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])
    respond_to do |format|
      if @user.save
        format.html { redirect_to(:root, :notice => 'User was successfully created.') }
        format.js
      else
        format.html { render action: "new" }
        format.js
      end
    end
  end


  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  def add_follower
    @follow = Follow.create(:follower_id => current_user.id, :following_id => params[:id])
    @user = User.find(@follow.follower_id)
  end
end

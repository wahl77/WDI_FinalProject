class ApplicationController < ActionController::Base
  protect_from_forgery
  skip_before_filter :require_login

  def not_authenticated
    redirect_to login_path, :alert => "Please login first."
  end

  def current_users_list
    current_users.map {|u| u.username}.join(", ")
  end

  helper_method :current_users_list

end

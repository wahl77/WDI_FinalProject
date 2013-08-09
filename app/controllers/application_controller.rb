class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :require_login

  def current_users_list
    current_users.map {|u| u.username}.join(", ")
  end

  helper_method :current_users_list

end

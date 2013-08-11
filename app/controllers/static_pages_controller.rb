class StaticPagesController < ApplicationController
  skip_before_filter :require_login, only:[:index, :about]
  def index
  end

  def about
    respond_to do |format|
      format.js { render layout: false }
    end
  end
end

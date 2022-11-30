class ApplicationController < ActionController::Base
  before_action :require_login, only: %i[create update destroy]
  before_action :check_user, only: %i[index show create update destroy]
  
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!, :set_user

  def login!
    puts "'logging in user' #{@user.id}"
    session[:user_id] = @user.id
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized_user?
    @user == current_user
  end

  def logout!
    session.clear
  end

  def set_user
    @user = User.find_by(id: session[:user_id])
  end

  def require_login
    return if logged_in?

    render json: {
      status: 500,
      errors: ['Please login to perform this action']
    }
  end

  def check_user
    if @user.nil?
      set_user
    end
  end
end

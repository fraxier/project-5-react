require 'pry'
class TagsController < ApplicationController
  def index
    tags = current_user.tags
    if tags
      render json: tags
    else
      render json: {
        status: 500,
        errors: ["couldn't find tags for this user"]
      }
    end
  end

  def show; end

  def create; end

  def new; end
end

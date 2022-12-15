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

  def create
    tag = Tag.new(tag_params)
    tag&.user_id = current_user.id
    binding.pry
    if tag.save
      render json: {
        status: :created,
        tag:
      }
    else
      render json: {
        status: 500,
        errors: tag.errors.full_messages
      }
    end
  end

  def new; end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end

require 'pry'
class LearningsController < ApplicationController
  def index
    @learnings = @user.learnings
    if @learnings
      render json: {
        learnings: @learnings
      }
    else
      render json: {
        status: 500,
        errors: ['no learnings found for this user']
      }
    end
  end

  def show
    @learning = @user.find_learning(params[:id])
    if @learning
      render json: {
        learning: @learning
      }
    else
      render json: {
        status: 500,
        errors: ['learning not found for this user']
      }
    end
  end

  def create
    @learning = Learning.new(learning_params)
    @learning.user_id = session[:user_id]
    if @learning.save
      render json: {
        status: :created,
        learning: @learning
      }
    else
      render json: {
        status: 500,
        errors: @learning.errors.full_messages
      }
    end
  end

  def recent
    params.permit(:num)
    num = params[:num]
    num ||= 5
    render json: {
      results: Learning.recent_learnings(session[:user_id], num)
    }
  end

  def main_learnings
    render json: {
      results: Tag.main_tag_learnings(session[:user_id])
    }
  end

  def count_learnings_by_tag
    render json: {
      results: Tag.count_learnings_by_tag(session[:user_id])
    }
  end

  def mega_summary
    total_learnings = current_user.learnings.count
    tags_by_most = ActiveRecord::Base.connection.execute(
      "SELECT Tags.name, COUNT(*) as count
      FROM Learnings_Tags
      INNER JOIN Tags
      WHERE user_id = #{session[:user_id]}"
    )
    total_tags = current_user.tags.count
    completed_learnings = current_user.tags.find_by(name: 'Completed')&.learnings&.count || 0
    started_learning = current_user.created_at
    render json: {
      total_learnings:,
      tags_by_most:,
      total_tags:,
      completed_learnings:,
      started_learning:
    }
  end

  private

  def learning_params
    params.require(:learning).permit(:name, :motivation)
  end
end

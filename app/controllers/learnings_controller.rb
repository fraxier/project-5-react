require 'pry'
class LearningsController < ApplicationController
  def index
    @learnings = @user.learnings
    if @learnings
      render json: @learnings
    else
      render json: {
        status: 500,
        errors: ['no learnings found for this user']
      }
    end
  end

  def show
    @learning = @user.find_learning(session[:user_id])
    if @learning
      result = {
        learning: @learning,
        headings: @learning.headings.map do |head|
          { heading: head, notes: head.notes }
        end
      }
      render json: result
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
      results: Tag.main_tag_learnings(session[:user_id], 5)
    }
  end

  def count_learnings_by_tag
    render json: {
      results: Tag.count_learnings_by_tag(session[:user_id])
    }
  end

  def mega_summary
    recent_learnings = Learning.recent_learnings(session[:user_id],
                                                 5).collect { |learn| { learn:, tags: learn.tags } }
    tags_summary = Tag.summary(session[:user_id])
    started_learning = current_user.created_at
    main_learnings = Tag.main_tag_learnings(session[:user_id])
    completed_learnings = Tag.completed_learnings(session[:user_id])

    total_learnings = current_user.learnings.count
    most_common_tags = Tag.most_common(session[:user_id])
    total_tags = current_user.tags.count
    total_completed = current_user.tags.find_by(name: 'Completed')&.learnings&.count || 0
    render json: {
      recent_learnings:,
      tags_summary:,
      started_learning:,
      main_learnings:,
      completed_learnings:,

      total_learnings:,
      most_common_tags:,
      total_tags:,
      total_completed:
    }
  end

  private

  def learning_params
    params.require(:learning).permit(:name, :motivation)
  end
end

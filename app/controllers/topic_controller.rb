require 'pry'
class TopicController < ApplicationController
  def index
    @topics = @user.find_topics(params[:subject_id])
    if @topics
      render json: {
        topics: @topics
      }
    else
      render json: {
        status: 500,
        errors: ['no topics found for this user']
      }
    end
  end

  def show
    @topic = @user.find_topic(params[:subject_id], params[:id])
    if @topic
      render json: {
        topic: @topic
      }
    else
      render json: {
        status: 500,
        errors: ["no topic of id #{params[:id]} found this user"]
      }
    end
  end

  def create; end
end

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
        errors: ['no topics found for this subject']
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
        errors: ["no topic of id #{params[:id]} found for this subject"]
      }
    end
  end

  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      render json: {
        status: :created,
        topic: @topic
      }
    else
      render json: {
        status: 500,
        errors: @topic.errors.full_messages
      }
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:name, :description, :subject_id)
  end
end

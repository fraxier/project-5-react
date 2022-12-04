class ResourcesController < ApplicationController
  def index
    @resources = @user.find_resources(params[:subject_id], params[:topic_id])
    if @resources
      render json: {
        resources: @resources
      }
    else
      render json: {
        status: 500,
        errors: ['no resources found for this topic']
      }
    end
  end

  def show
    @resource = @user.find_resource(params[:subject_id], params[:topic_id], params[:id])
    if @resource
      render json: {
        resource: @resource
      }
    else
      render json: {
        status: 500,
        errors: ["no resource of id #{params[:id]} found this user"]
      }
    end
  end

  def create
    @resource = Resource.new(topic_params)
    if @resource.save
      render json: {
        status: :created,
        resource: @resource
      }
    else
      render json: {
        status: 500,
        errors: @resource.errors.full_messages
      }
    end
  end

  private

  def topic_params
    params.require(:resource).permit(:url, :topic_id)
  end
end
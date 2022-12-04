require 'pry'
class HeadingsController < ApplicationController
  def index
    @headings = @user.find_headings(params[:subject_id])
    if @headings
      render json: {
        headings: @headings
      }
    else
      render json: {
        status: 500,
        errors: ['no headings found for this subject']
      }
    end
  end

  def show
    @heading = @user.find_heading(params[:subject_id], params[:id])
    if @heading
      render json: {
        heading: @heading
      }
    else
      render json: {
        status: 500,
        errors: ["no heading of id #{params[:id]} found for this subject"]
      }
    end
  end

  def create
    @heading = Heading.new(heading_params)
    if @heading.save
      render json: {
        status: :created,
        heading: @heading
      }
    else
      render json: {
        status: 500,
        errors: @heading.errors.full_messages
      }
    end
  end

  private

  def heading_params
    params.require(:heading).permit(:name, :description, :subject_id)
  end
end

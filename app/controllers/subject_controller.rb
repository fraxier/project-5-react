require 'pry'
class SubjectController < ApplicationController
  def index
    @subjects = @user.subjects
    if @subjects
      render json: {
        subjects: @subjects
      }
    else
      render json: {
        status: 500,
        errors: ['no subjects found for this user']
      }
    end
  end

  def show
    @subject = @user.find_subject(params[:id])
    if @subject
      render json: {
        subject: @subject
      }
    else
      render json: {
        status: 500,
        errors: ['subject not found for this user']
      }
    end
  end

  def create
    @subject = Subject.new(subject_params)
    @subject.user_id = session[:user_id]
    if @subject.save
      render json: {
        status: :created,
        subject: @subject
      }
    else
      render json: {
        status: 500,
        errors: @subject.errors.full_messages
      }
    end
  end

  private

  def subject_params
    params.require(:subject).permit(:name, :description)
  end
end

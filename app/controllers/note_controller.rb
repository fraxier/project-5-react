class NoteController < ApplicationController
  def index
    @notes = @user.find_notes(params[:subject_id], params[:topic_id])
    if @notes
      render json: {
        notes: @notes
      }
    else
      render json: {
        status: 500,
        errors: ['no notes found for this topic']
      }
    end
  end

  def show
    @note = @user.find_note(params[:subject_id], params[:topic_id], params[:id])
    if @note
      render json: {
        note: @note
      }
    else
      render json: {
        status: 500,
        errors: ["no note of id #{params[:id]} found this user"]
      }
    end
  end

  def create
    @note = Note.new(topic_params)
    if @note.save
      render json: {
        status: :created,
        note: @note
      }
    else
      render json: {
        status: 500,
        errors: @note.errors.full_messages
      }
    end
  end

  private

  def topic_params
    params.require(:note).permit(:content, :topic_id)
  end
end

class NotesController < ApplicationController
  def index
    headings = current_user&.headings
    heading = headings&.find(params[:heading_id])
    notes = heading&.notes
    if notes
      render json: notes
    else
      render json: {
        status: 500,
        errors: ['no notes found for this heading']
      }
    end
  end

  def show
    headings = current_user&.headings
    heading = headings&.find(note_params[:heading_id])
    notes = heading&.notes
    note = notes&.find(note_params[:id])
    if note
      render json: note
    else
      render json: {
        status: 500,
        errors: ["no note of id #{params[:id]} found this user"]
      }
    end
  end

  def create
    note = Note.new(note_params)
    if note.save
      render json: {
        status: :created,
        note:
      }
    else
      render json: {
        status: 500,
        errors: note.errors.full_messages
      }
    end
  end

  private

  def note_params
    params.require(:note).permit(:content, :heading_id)
  end
end

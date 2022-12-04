require 'pry'
class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true

  has_many :learnings
  has_many :tags

  def find_learning(learning_id)
    learnings.find_by(id: learning_id)
  end

  def find_headings(learning_id)
    find_learning(learning_id)&.headings
  end

  def find_heading(learning_id, heading_id)
    find_headings(learning_id)&.find_by(id: heading_id)
  end

  def find_notes(learning_id, heading_id)
    find_heading(learning_id, heading_id)&.notes
  end

  def find_note(learning_id, heading_id, note_id)
    find_notes(learning_id, heading_id)&.find_by(id: note_id)
  end

  def find_resources(learning_id, heading_id)
    find_heading(learning_id, heading_id)&.resources
  end

  def find_resource(learning_id, heading_id, resouce_id)
    find_resources(learning_id, heading_id)&.find_by(id: resouce_id)
  end

  def check_username(username)
    User.find_by(username: username)
  end

  #########
  #### For possible future use ####
  #########

  def param_learning(learning_id)
    learnings.find_by(id: learning_id)
  end

  def param_heading(learning_id, heading_id)
    param_learning(learning_id).headings.find_by(id: heading_id)
  end

  def param_note(learning_id, heading_id, note_id)
    param_heading(learning_id, heading_id).notes.find_by(id: note_id)
  end

  def param_resource(learning_id, heading_id, resource_id)
    param_heading(learning_id, heading_id).resources.find_by(id: resource_id)
  end

  def param_all_headings(learning_id)
    param_learning(learning_id).headings
  end

  def param_all_notes(learning_id, heading_id)
    param_heading(learning_id, heading_id).notes
  end

  def param_all_resources(learning_id, heading_id)
    param_heading(learning_id, heading_id).resources
  end
end

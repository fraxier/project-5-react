require 'pry'
class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }

  has_many :subjects

  def find_subject(subject_id)
    subjects.find_by(id: subject_id)
  end

  def find_topics(subject_id)
    find_subject(subject_id)&.topics
  end

  def find_topic(subject_id, topic_id)
    find_topics(subject_id)&.find_by(id: topic_id)
  end

  def find_notes(subject_id, topic_id)
    find_topic(subject_id, topic_id)&.notes
  end

  def find_note(subject_id, topic_id, note_id)
    find_notes(subject_id, topic_id)&.find_by(id: note_id)
  end

  def find_resources(subject_id, topic_id)
    find_topic(subject_id, topic_id)&.resources
  end

  def find_resource(subject_id, topic_id, resouce_id)
    find_resources(subject_id, topic_id)&.find_by(id: resouce_id)
  end

  def check_username(username)
    User.find_by(username: username)
  end

  #########
  #### For possible future use ####
  #########

  def param_subject(subject_id)
    subjects.find_by(id: subject_id)
  end

  def param_topic(subject_id, topic_id)
    param_subject(subject_id).topics.find_by(id: topic_id)
  end

  def param_note(subject_id, topic_id, note_id)
    param_topic(subject_id, topic_id).notes.find_by(id: note_id)
  end

  def param_resource(subject_id, topic_id, resource_id)
    param_topic(subject_id, topic_id).resources.find_by(id: resource_id)
  end

  def param_all_topics(subject_id)
    param_subject(subject_id).topics
  end

  def param_all_notes(subject_id, topic_id)
    param_topic(subject_id, topic_id).notes
  end

  def param_all_resources(subject_id, topic_id)
    param_topic(subject_id, topic_id).resources
  end
end

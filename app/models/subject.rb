class Subject < ApplicationRecord
  belongs_to :user
  has_many :topics
  has_many :notes, through: :topic
  has_many :resources, through: :topic
end

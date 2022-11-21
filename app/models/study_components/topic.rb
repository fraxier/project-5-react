class Topic < ApplicationRecord
  belongs_to :subject
  has_many :notes
  has_many :resources
end

class Heading < ApplicationRecord
  belongs_to :learning
  has_one :user, through: :learning
  has_many :notes
  has_many :resources

end

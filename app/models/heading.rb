class Heading < ApplicationRecord
  belongs_to :learning
  has_many :notes
  has_many :resources

  def heading_and_notes(user_id)

  end
end

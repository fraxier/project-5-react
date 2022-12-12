class Note < ApplicationRecord
  belongs_to :heading
  has_one :user, through: :heading

  validates :content, presence: true
end

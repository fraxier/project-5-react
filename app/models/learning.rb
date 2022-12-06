class Learning < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :headings
  has_many :notes, through: :topic
  has_many :resources, through: :topic

  def self.recent_learnings(user_id, num = 5)
    Learning.where(user_id:)&.order(updated_at: :desc)&.limit(num)
  end
end

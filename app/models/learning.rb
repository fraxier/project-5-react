class Learning < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags
  has_many :headings
  has_many :notes, through: :topic
  has_many :resources, through: :topic

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  validates :name, length: { minimum: 4 }
  validates :motivation, presence: true
  validates :motivation, length: { minimum: 3 }

  def self.recent_learnings(user_id, num = 5)
    learnings = Learning.where(user_id:)&.order(updated_at: :desc)&.limit(num)
    learnings.collect { |learn| { learn:, tags: learn.tags } }
  end
end

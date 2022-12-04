class Tag < ApplicationRecord
  validates :name, presence: true
  has_and_belongs_to_many :learnings
  belongs_to :user

  def self.main_tag_learnings(user_id)
    
  end

  def self.tag_totals(user_id)
    Tag.where()
  end

  def self.count_learnings_by_tag(user_id)
    Tag.where(user_id:).collect do |tag|
      learnings = tag.learnings
      { name: learnings, count: learnings.count }
    end
  end
end

class Extras < ActiveRecord::Migration[7.0]
  def change
    add_column :headings, :ordinal, :integer
    add_column :tags, :bg_color, :string
    add_column :tags, :font_color, :string
  end
end

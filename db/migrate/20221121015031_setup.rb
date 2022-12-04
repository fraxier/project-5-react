class Setup < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest

      t.timestamps
    end

    create_table :learnings do |t|
      t.string :name
      t.text :motivation
      t.belongs_to :user

      t.timestamps
    end

    create_table :headings do |t|
      t.string :name
      t.belongs_to :learning

      t.timestamps
    end

    create_table :notes do |t|
      t.text :content
      t.belongs_to :heading

      t.timestamps
    end

    create_table :resources do |t|
      t.string :url
      t.belongs_to :heading

      t.timestamps
    end

    create_table :tags do |t|
      t.string :name
      t.belongs_to :user
      t.boolean :deletable, default: true, null: false
    end

    create_join_table :learnings, :tags
  end
end

class Setup < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
    end

    create_table :subjects do |t|
      t.string :name
      t.text :description

      t.timestamps
    end

    create_table :topics do |t|
      t.string :name
      t.text :description
      t.belongs_to :subject

      t.timestamps
    end

    create_table :notes do |t|
      t.datetime :created_on
      t.belongs_to :topic
    end

    create_table :resources do |t|
      t.string :url
    end
  end
end

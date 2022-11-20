class Setup < ActiveRecord::Migration[7.0]
  def change
    create_table :user do |t|
      t.string :username
      t.string :password
    end

    create_table :subject do |t|
      t.string :name
      t.text :description

      t.timestamps
    end

    create_table :topic do |t|
      t.string :name
      t.text :description

      
    end
  end
end

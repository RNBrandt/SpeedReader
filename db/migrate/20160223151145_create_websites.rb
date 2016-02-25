class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :url, null: false
      t.string :title
      t.text :text, null: false
      t.integer :user_id


    end
  end
end

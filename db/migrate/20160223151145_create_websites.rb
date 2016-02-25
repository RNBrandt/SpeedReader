class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :url, null: false
      t.string :title
      t.text :text, null: false
      t.integer :user_id

      t.timestamps, null: false
    end
  end
end

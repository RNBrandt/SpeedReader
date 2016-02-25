class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :url, null: false
      t.integer :h1_id
      t.integer :h2_id
      t.integer :h3_id
      t.integer :h4_id
      t.integer :ul_id
      t.integer :ol_id
      t.integer :p_id
      t.integer :span_id

      t.timestamps, null: false
    end
  end
end

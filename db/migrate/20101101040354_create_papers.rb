class CreatePapers < ActiveRecord::Migration
  def self.up
    create_table :papers do |t|
      t.string :name
      t.string :initial
      t.string :price
      t.integer :day, :default => 1
      t.integer :qunt, :default => 1
      t.string :paper_type
      t.timestamps
    end
  end

  def self.down
    drop_table :papers
  end
end

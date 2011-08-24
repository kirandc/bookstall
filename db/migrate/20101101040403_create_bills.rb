class CreateBills < ActiveRecord::Migration
  def self.up
    create_table :bills do |t|
      t.integer :customer_id
      t.integer :paper_id
      t.integer :month
      t.integer :year
      t.integer :qunt
      t.integer :day
      t.boolean :is_paid, :default => 0
      t.string :amount
      t.timestamps
    end
  end

  def self.down
    drop_table :bills
  end
end

class CreateBillHistories < ActiveRecord::Migration
  def self.up
    create_table :bill_histories do |t|
      t.integer :paper_id
      t.integer :month
      t.integer :year
      t.timestamps
    end
  end

  def self.down
    drop_table :bill_histories
  end
end

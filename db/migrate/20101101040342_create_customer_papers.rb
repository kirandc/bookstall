class CreateCustomerPapers < ActiveRecord::Migration
  def self.up
    create_table :customer_papers do |t|
      t.integer :customer_id
      t.integer :paper_id
      t.timestamps
    end
  end

  def self.down
    drop_table :customer_papers
  end
end

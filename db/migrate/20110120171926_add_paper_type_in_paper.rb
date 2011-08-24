class AddPaperTypeInPaper < ActiveRecord::Migration
  def self.up
	remove_column :customers, :customer_type
	add_column :papers, :paper_month_year, :string, :default =>"Monthly"
	add_column :customers, :customer_type, :string, :default =>"Monthly"
  end

  def self.down
	add_column :customers, :customer_type, :string
	remove_column :papers, :paper_month_year
	remove_column :customers, :customer_type
  end
end

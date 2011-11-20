class AddAnotherDiscountField < ActiveRecord::Migration
  def self.up
    add_column :customers, :discount, :integer, :default => 0
  end

  def self.down
    remove_column :customers, :discount
  end
end

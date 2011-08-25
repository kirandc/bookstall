class ChangeBilllAmountType < ActiveRecord::Migration
  def self.up
    change_column :bills, :amount, :float, :default => 0.0
  end

  def self.down
    change_column :bills, :amount, :string
  end
end

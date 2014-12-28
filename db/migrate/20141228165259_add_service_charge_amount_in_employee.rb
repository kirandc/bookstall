class AddServiceChargeAmountInEmployee < ActiveRecord::Migration
  def self.up
    add_column :employees, :service_charge_amount, :float, :default => 5.0
  end

  def self.down
    remove_column :employees, :service_charge_amount
  end
end

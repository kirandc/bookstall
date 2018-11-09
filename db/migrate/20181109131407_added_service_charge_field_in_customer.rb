class AddedServiceChargeFieldInCustomer < ActiveRecord::Migration
  def self.up
    add_column :customers, :service_charge_field, :integer, :default => 10
  end

  def self.down
    rmove_column :customers, :service_charge_field
  end
end

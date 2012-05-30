class AddServiceChargeForCustomer < ActiveRecord::Migration
  def self.up
    add_column :customers, :service_charge, :boolean, :default => false
  end

  def self.down
    rmove_column :customers, :service_charge
  end
end

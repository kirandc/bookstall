class AddServiceChargeInEmp < ActiveRecord::Migration
  def self.up
    add_column :employees, :service_charge, :boolean, :default => false
  end

  def self.down
    remove_column :employees, :service_charge
  end
end

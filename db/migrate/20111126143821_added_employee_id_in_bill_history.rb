class AddedEmployeeIdInBillHistory < ActiveRecord::Migration
  def self.up
    add_column :bill_histories, :employee_id, :integer
  end

  def self.down
    remove_column :bill_histories, :employee_id
  end
end

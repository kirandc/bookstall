class CreateCustomers < ActiveRecord::Migration
  def self.up
    create_table :customers do |t|
      t.string :custid
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.text :address
      t.string :phone_no
      t.string :mobile_no
      t.integer :employee_id
      t.timestamps
    end
  end

  def self.down
    drop_table :customers
  end
end

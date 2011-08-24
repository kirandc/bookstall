class Customer < ActiveRecord::Base
  has_many :customer_papers,  :dependent => :destroy
  has_many :bills,  :dependent => :destroy
  validates_presence_of :first_name, :employee_id
  belongs_to :employee
  
  def before_save
	if self.custid.blank? 
		emp = Employee.find(self.employee_id)
		cus = Customer.last
		if cus.blank?
			new_id = 1
		else
			new_id = cus.id+1
		end
		self.custid = "#{emp.initial}#{new_id}" 
        elsif self.employee_id_changed?
		emp = Employee.find(self.employee_id)
		self.custid = "#{emp.initial}#{self.id}"
	end
  end
end

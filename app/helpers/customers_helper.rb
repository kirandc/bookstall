module CustomersHelper
def get_customer_paper(customer, paper_id)
	if customer.blank?
	 return false
	else
	  customer_paper = CustomerPaper.find_by_customer_id_and_paper_id(customer.id, paper_id)
	  return true if customer_paper
	  return false
	end
end
end

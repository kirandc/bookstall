class Paper < ActiveRecord::Base
  has_many :customer_papers
  has_many :bills
  has_many :bill_history
  validates_presence_of :name
end

class Bill < ActiveRecord::Base
  belongs_to :customer
  belongs_to :paper
  validates_presence_of :customer_id,:paper_id, :month, :year, :amount
end

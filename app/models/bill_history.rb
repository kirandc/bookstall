class BillHistory < ActiveRecord::Base
  belongs_to :paper
  belongs_to :employee
  validates_uniqueness_of :month, :scope =>  [:year]
  validates_presence_of :month, :year, :employee_id
end

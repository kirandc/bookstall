class Employee < ActiveRecord::Base
  has_many :customers
  has_many :bill_histories
  validates_presence_of :name, :initial
  validates_uniqueness_of :initial
end

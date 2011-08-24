class Employee < ActiveRecord::Base
  has_many :customers
  validates_presence_of :name, :initial
  validates_uniqueness_of :initial
end

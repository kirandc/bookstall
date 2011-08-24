class BillHistory < ActiveRecord::Base
  belongs_to :paper
  validates_uniqueness_of :month, :scope =>  [:year]
  validates_presence_of :month, :year
end

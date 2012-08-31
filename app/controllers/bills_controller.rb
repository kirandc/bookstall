class BillsController < ApplicationController
  def index
    @bill_histories = BillHistory.paginate( :all, :order => 'created_at DESC', :page => params[:page], :per_page => 100)
  end

  def new
    @bill_history =  BillHistory.new
  end


  def create
    @bill_history = BillHistory.new(params[:bill_history])    
    @bill_history.save!
    @customers = @bill_history.employee.customers
    @customers.each do | customer|
    customer.customer_papers.each do |customer_paper|
      Bill.create!(:customer_id => customer_paper.customer.id, :paper_id => customer_paper.paper_id, :day => customer_paper.paper.day, :qunt => customer_paper.paper.qunt, :month => @bill_history.month, :year => @bill_history.year, :amount => customer_paper.paper.price.to_f )
    end if !customer.customer_papers.blank?
    end if !@customers.blank?
    flash[ :notice ] = "Bill created Sucessfully"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'new'
  end


  def destroy
    @bill_history = BillHistory.find(params[:id])
    if !@bill_history.blank?
      cus_id = @bill_history.employee.customers.collect(&:id)
      @bills = Bill.find(:all, :conditions => ["month = ? and year = ? and customer_id IN(?)", @bill_history.month, @bill_history.year, cus_id])
      @bills.each do |bill|
        bill.destroy
      end if !@bills.blank?
      @bill_history.destroy
      flash[ :notice ] = "Customers bill history deleted Sucessfully"
    end
    redirect_to :action => 'index'
  end

  def bill_search
  end

  def search
    @total_paid = Bill.sum(:amount, :conditions => ["paper_id = ? and month = ? and year = ? and is_paid = 1", params[:bill][:paper_id], params[:bill][:month], params[:bill][:year]])
    @total_unpaid = Bill.sum(:amount, :conditions => ["paper_id = ? and month = ? and year = ? and is_paid = 0", params[:bill][:paper_id], params[:bill][:month], params[:bill][:year]])
    @bills = Bill.paginate(:all, :conditions => ["paper_id = ? and month = ? and year = ? and is_paid = ?", params[:bill][:paper_id], params[:bill][:month], params[:bill][:year], params[:bill][:is_paid]],:page => params[:page], :per_page => 1000)
  end

  def bill_print
  end

  def print
    @reciept_type = params[:reciept_type] 
    @employee = Employee.find(params[:employee_id])
    if not params[:employee_id].blank?
      @customers = Customer.find(:all, :conditions => ["employee_id = ?", params[:employee_id]])
    else
      @customers = Customer.find(:all, :order => "custid ASC")
    end
    @month = params[:bill][:month]
    @year = params[:bill][:year]
    render :layout => false
  end
end

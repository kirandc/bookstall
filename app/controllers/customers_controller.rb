class CustomersController < ApplicationController
  def index
    if !params[:search].blank? and !params[:search][:condition].blank?
      if params[:search][:condition] == "name"
        @customers = Customer.paginate( :all, :conditions => "first_name LIKE '%#{params[:qname]}%'", :order => 'created_at ASC', :page => params[:page], :per_page => 100)
        @condition = "name"
        @q = params[:qname]
      else
        @customers = Customer.paginate( :all, :conditions => "custid = '#{params[:q]}'",:order => 'created_at ASC', :page => params[:page], :per_page => 100) if !params[:q].blank?
        @condition = "id"
        @q = params[:q]
      end
    else
      @customers = Customer.paginate( :all, :order => 'created_at ASC', :page => params[:page], :per_page => 100)
    end
  end

  def new
    @customer = Customer.new
    @papers = Paper.all
  end

  def show
    @customer = Customer.find(params[:id])
    @papers = Paper.all
  end

  def create
    @customer = Customer.new(params[:customer])
    @customer.save!
    if ![:papers].blank?
      params[:papers].each do |paper_id|
        CustomerPaper.create!(:customer_id => @customer.id, :paper_id => paper_id)
      end
    end
    flash[ :notice ] = "Customer Sucessfully created"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    @papers = Paper.all
    render :action => 'new'
  end

  def update
    @customer = Customer.find(params[:id])
    @customer.update_attributes(params[:customer])
    if ![:papers].blank?
      @customer.customer_papers.each do |cus_paper|
        cus_paper.destroy
      end

      params[:papers].each do |paper_id|
        CustomerPaper.create!(:customer_id => @customer.id, :paper_id => paper_id) 
      end
    end
    flash[ :notice ] = "Customer Sucessfully updated"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    @papers = Paper.all
    render :action => 'show'
  end

  def destroy
    @customer = Customer.find(params[:id])
    @customer.destroy
    flash[ :notice ] = "Customer deleted Sucessfully"
    redirect_to :action => 'index'
  end

  def bill_history
    @customer = Customer.find(params[:id])
  end

  def paid
    @bill = Bill.find(params[:id])
    @bill.is_paid = true
    @bill.save
    render :update do |page|
      page.replace_html "bill_#{@bill.id}", :text => 'Paid'
    end      
  end

  def print
    @bill = Bill.find(params[:id])
    render :layout => false
  end
  
  def bill_edit
	@bill = Bill.find(params[:bill_id])
	@customer = Customer.find(params[:id])
  end
  
  def update_bill
	@bill = Bill.find(params[:id])
	@customer = Customer.find(params[:custid])
	@bill.update_attributes(params[:bill])
	  flash[ :notice ] = "Bill Sucessfully updated"
    redirect_to :action => 'bill_history', :id => @customer.id
  rescue ActiveRecord::RecordInvalid
    render :action => 'bill_edit'
  end
end

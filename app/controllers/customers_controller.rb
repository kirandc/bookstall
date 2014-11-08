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
    session["request_id"] = nil
  end

  def new
    @customer = Customer.new
    @papers = Paper.order("created_at asc")
  end

  def show
    @customer = Customer.find(params[:id])
    @papers = Paper.order("created_at asc")
  end

  def create
    @customer = Customer.new(params[:customer])
    @customer.save!
    if ![:papers].blank?
      params[:papers].each do |paper_id|
        CustomerPaper.create!(:customer_id => @customer.id, :paper_id => paper_id)
      end if not params[:papers].blank?
    end
    flash[ :notice ] = "Customer Sucessfully created"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    @papers = Paper.order("created_at asc")
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
      end if not params[:papers].blank?
    end
    flash[ :notice ] = "Customer Sucessfully updated"
    if session["request_id"].blank?
      redirect_to :action => :index 
    else
      redirect_to customer_list_employee_path(:id => session["request_id"])
    end
    session["request_id"] = nil
  rescue ActiveRecord::RecordInvalid
    @papers = Paper.order("created_at asc")
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
    respond_to do |format|
      format.js
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
  #@bill.amount = (@bill.qunt * @bill.paper.price.to_f)
  #@bill.save
	  flash[ :notice ] = "Bill Sucessfully updated"
    redirect_to :action => 'bill_history', :id => @customer.id
  rescue ActiveRecord::RecordInvalid
    render :action => 'bill_edit'
  end
end

class EmployeesController < ApplicationController
  def index
      @employees = Employee.order('created_at ASC').page(params[:page]).per_page(100)
  end

  def new
    @employee = Employee.new
  end

  def show
    @employee = Employee.find(params[:id])
  end

  def create
    @employee = Employee.new(employee_params)
    @employee.save!
    flash[ :notice ] = "Employee Sucessfully created"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'new'
  end

  def update
    @employee = Employee.find(params[:id])
    @employee.update_attributes(employee_params)
    flash[ :notice ] = "Employee Sucessfully updated"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'show'
  end

  def destroy
    @Employee = Employee.find(params[:id])
    @Employee.destroy
    flash[ :notice ] = "Employee deleted Sucessfully"
    redirect_to :action => 'index'
  end
  
  def customer_list
    session["request_id"] = nil
    @employee = Employee.find(params[:id])
    @customers = Customer.where("employee_id = ?", @employee.id).order('created_at ASC').page(params[:page]).per_page(100) if !@employee.blank?
    session["request_id"] = params[:id]
  end

  def get_customer
  end

  def customer_view
    @employee = Employee.find(params[:emp])
    @month = params[:month]
    @year = params[:year]
    render :layout => "employee"
  end

  private
  
  def employee_params
    params.fetch(:employee, {}).permit(:name, :initial, :service_charge)
  end
end

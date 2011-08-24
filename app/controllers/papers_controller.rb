class PapersController < ApplicationController
  def index
    @papers = Paper.paginate( :all, :order => 'created_at ASC', :page => params[:page], :per_page => 100)
  end

  def new
    @paper = Paper.new
  end

  def show
    @paper = Paper.find(params[:id])
  end

  def create
    @paper = Paper.new(params[:paper])
    @paper.save!
    flash[ :notice ] = "Paper Sucessfully created"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'new'
  end

  def update
    @paper = Paper.find(params[:id])
    @paper.update_attributes(params[:paper])
    flash[ :notice ] = "Paper
    Sucessfully updated"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'show'
  end

  def delete
    @paper = Paper.find(params[:id])
    @paper.destroy
    flash[ :notice ] = "Paper deleted Sucessfully"
    redirect_to :action => 'index'
  end
end

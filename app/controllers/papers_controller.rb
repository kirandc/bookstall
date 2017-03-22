class PapersController < ApplicationController
  def index
    @papers = Paper.order('created_at ASC').page(params[:page]).per_page(100)
  end

  def new
    @paper = Paper.new
  end

  def show
    @paper = Paper.find(params[:id])
  end

  def create
    @paper = Paper.new(paper_params)
    @paper.save!
    flash[ :notice ] = "Paper Sucessfully created"
    redirect_to :action => 'index'
  rescue ActiveRecord::RecordInvalid
    render :action => 'new'
  end

  def update
    @paper = Paper.find(params[:id])
    @paper.update_attributes(paper_params)
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
   
  private

  def paper_params
    params.fetch(:paper, {}).permit(:name, :initial, :paper_type, :paper_month_year, :day, :qunt, :price)
  end
end

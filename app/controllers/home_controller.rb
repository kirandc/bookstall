class HomeController < ApplicationController
  def index
  @ip = request.remote_ip
  end
end

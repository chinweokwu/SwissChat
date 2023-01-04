class RoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @room = Room.new
    @rooms = Room.public_rooms
    @users = User.all_except(current_user)
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to rooms_path
    else
      redirect_to rooms_path
    end
  end

  private
  
  def room_params
    params.require(:room).permit(:name, :is_private)
  end
end

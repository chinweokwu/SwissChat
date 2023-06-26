class RoomsController < ApplicationController
  include RoomsHelper
  before_action :authenticate_user!
  before_action :set_status

  def index
    @room = Room.new
    @joined_rooms = current_user.joined_rooms
    @rooms = search_rooms
    @users = User.all_except(current_user)
    render 'index'
  end

  def show
    @single_room = Room.find(params[:id])
    @room = Room.new
    @rooms = search_rooms
    @joined_rooms = current_user.joined_rooms

    @message = Message.new
    @messages = @single_room.messages.order(created_at: :asc)

    @users = User.all_except(current_user)
    render 'index'
  end

  def create
    @room = Room.create(room_params)
    redirect_to rooms_path
  end


  def search
    @rooms = search_rooms
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.update(
            'search_results',
            partial: 'rooms/search_results',
            locals: {
              rooms: @rooms
            }
          )
        ]
      end
    end
  end

  def join
    @room = Room.find(params[:id])
    current_user.joined_rooms << @room
    redirect_to room_path
  end

  def leave
    @room = Room.find(params[:id])
    current_user.joined_rooms.delete(@room)
    redirect_to rooms_path
  end

  private
  
  def room_params
    params.require(:room).permit(:name, :is_private)
  end

  def set_status
    current_user.update!(status: User.statuses[:offline]) if current_user
  end
end

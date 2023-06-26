class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  scope :all_except, ->(user) { where.not(id: user) }

  has_many :messages
  has_one_attached :avatar
  has_many :joinables, dependent: :destroy
  has_many :joined_rooms, through: :joinables, source: :room

  validates_uniqueness_of :username, required: true, case_sensitive: false
  
  enum status: %i[offline away online]
  enum role: %i[user admin].freeze, _default: 0

  after_create_commit { broadcast_append_to "users"}
  after_commit :add_default_avatar, on: %i[create update]
  after_update_commit { broadcast_update }

  def avatar_thumbnail
    avatar.variant(resize_to_limit: [150, 150]).processed
  end

  def chat_avatar
    avatar.variant(resize_to_limit: [50, 50]).processed
  end

  def broadcast_update
    broadcast_replace_to 'user_status', partial:'users/status', user: self
  end

  def has_joined_room(room)
    joined_rooms.include?(room)
  end
  

  def status_to_css
    case status
    when 'offline'
      'bg-gray-100'
    when 'away'
      'bg-indigo-500'
    when 'online'
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
    else
      'bg-yellow-500'
    end
  end

  private

  def add_default_avatar
    return if avatar.attached?

    avatar.attach(
      io: File.open("#{Rails.root}/app/assets/images/default_avatar.png"),
      filename: "default_avatar.png",
      content_type: "image/png"
    )
  end
end

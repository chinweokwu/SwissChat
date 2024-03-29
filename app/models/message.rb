class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  after_create_commit do
    update_parent_room
    broadcast_append_later_to room
  end

  before_create :confirm_participant
  has_many_attached :attachments, dependent: :destroy


  def chat_attachment(index)
    tag_attach = attachments[index]
    return unless attachments.attached?

    if tag_attach.image?
      tag_attach.variant(resize_to_limit: [150, 150]).processed
    elsif tag_attach.video?
      tag_attach.variant(resize_to_limit: [150, 150]).processed
    end
  end

  def confirm_participant
    return unless room.is_private

    is_participant = Participant.where(user_id: user.id, room_id: room.id).first
    throw :abort unless is_participant
  end

  def update_parent_room
    room.update(last_message_at: Time.now)
  end
end

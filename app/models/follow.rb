class Follow < ActiveRecord::Base

  attr_accessible :follower, :follower_id, :following, :following_id

  # The person following
  belongs_to :follower, class_name: "User"

  # The person being followed
  belongs_to :following, class_name: "User"

end

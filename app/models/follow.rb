class Follow < ActiveRecord::Base

  attr_accessible :follower, :follower_id, :following, :following_id

  belongs_to :follower, class_name: "User"
  belongs_to :following, , class_name: "User"

end
